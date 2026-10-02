import torch
from transformers import AutoTokenizer, AutoModelForCausalLM


class LLM:
    """Singleton que carrega e executa o modelo LLM local via PyTorch."""

    _instance = None
    MODEL_NAME = "Qwen/Qwen2.5-1.5B-Instruct"

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._loaded = False
        return cls._instance

    def load(self):
        if self._loaded:
            return

        if torch.backends.mps.is_available():
            self.device = torch.device("mps")
        else:
            self.device = torch.device("cpu")

        print(f"Carregando {self.MODEL_NAME} em {self.device}...")

        self.tokenizer = AutoTokenizer.from_pretrained(self.MODEL_NAME)
        self.model = AutoModelForCausalLM.from_pretrained(
            self.MODEL_NAME,
            torch_dtype=torch.float16,
        ).to(self.device)

        self._loaded = True
        print("Modelo carregado.")

    def generate(self, prompt: str, max_new_tokens: int = 256) -> str:
        self.load()

        messages = [
            {
                "role": "system",
                "content": (
                    "Você é um assistente que responde perguntas com base "
                    "no contexto fornecido. Responda sempre em português."
                ),
            },
            {"role": "user", "content": prompt},
        ]

        text = self.tokenizer.apply_chat_template(
            messages, tokenize=False, add_generation_prompt=True
        )
        inputs = self.tokenizer(text, return_tensors="pt").to(self.device)

        with torch.no_grad():
            output = self.model.generate(
                **inputs,
                max_new_tokens=max_new_tokens,
                do_sample=False,
            )

        response = self.tokenizer.decode(
            output[0][inputs["input_ids"].shape[1] :],
            skip_special_tokens=True,
        )
        return response

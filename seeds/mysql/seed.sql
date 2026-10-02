USE universidade;

CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    duracao_semestres INT NOT NULL,
    modalidade VARCHAR(20) NOT NULL
);

CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    titulacao VARCHAR(50) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    curso_id INT NOT NULL,
    professor_id INT NOT NULL,
    carga_horaria INT NOT NULL,
    semestre INT NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id),
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    curso_id INT NOT NULL,
    semestre_atual INT NOT NULL,
    situacao VARCHAR(20) NOT NULL,
    FOREIGN KEY (curso_id) REFERENCES cursos(id)
);

-- Cursos
INSERT INTO cursos (nome, departamento, duracao_semestres, modalidade) VALUES
('Sistemas de Informação', 'Computação', 8, 'Presencial'),
('Engenharia de Software', 'Computação', 10, 'Presencial'),
('Ciência da Computação', 'Computação', 8, 'Presencial'),
('Administração', 'Gestão', 8, 'Presencial'),
('Direito', 'Ciências Jurídicas', 10, 'Presencial'),
('Medicina', 'Ciências da Saúde', 12, 'Presencial'),
('Psicologia', 'Ciências Humanas', 10, 'Presencial'),
('Enfermagem', 'Ciências da Saúde', 10, 'Presencial');

-- Professores
INSERT INTO professores (nome, titulacao, departamento, email) VALUES
('Dr. Carlos Mendes', 'Doutor', 'Computação', 'carlos.mendes@ceuma.br'),
('Dra. Ana Beatriz Lima', 'Doutora', 'Computação', 'ana.lima@ceuma.br'),
('Me. Roberto Farias', 'Mestre', 'Computação', 'roberto.farias@ceuma.br'),
('Dra. Mariana Costa', 'Doutora', 'Gestão', 'mariana.costa@ceuma.br'),
('Dr. Paulo Henrique Silva', 'Doutor', 'Ciências Jurídicas', 'paulo.silva@ceuma.br'),
('Dra. Fernanda Oliveira', 'Doutora', 'Ciências da Saúde', 'fernanda.oliveira@ceuma.br'),
('Me. Lucas Almeida', 'Mestre', 'Computação', 'lucas.almeida@ceuma.br'),
('Dra. Juliana Santos', 'Doutora', 'Ciências Humanas', 'juliana.santos@ceuma.br');

-- Disciplinas
INSERT INTO disciplinas (nome, curso_id, professor_id, carga_horaria, semestre) VALUES
('Inteligência Artificial', 1, 1, 80, 6),
('Banco de Dados', 1, 2, 60, 4),
('Engenharia de Requisitos', 2, 3, 60, 5),
('Estrutura de Dados', 3, 7, 80, 3),
('Programação Web', 1, 7, 60, 5),
('Redes de Computadores', 1, 3, 60, 5),
('Gestão de Projetos', 4, 4, 40, 6),
('Direito Constitucional', 5, 5, 80, 3),
('Anatomia Humana', 6, 6, 120, 1),
('Psicologia Social', 7, 8, 60, 4),
('Algoritmos', 3, 1, 80, 2),
('Sistemas Operacionais', 1, 2, 60, 4),
('Compiladores', 3, 7, 60, 6),
('Cálculo I', 2, 3, 80, 1),
('Farmacologia', 8, 6, 60, 5);

-- Alunos
INSERT INTO alunos (nome, matricula, curso_id, semestre_atual, situacao) VALUES
('João Pedro Souza', '2024001', 1, 6, 'Ativo'),
('Maria Clara Ferreira', '2024002', 1, 4, 'Ativo'),
('Lucas Gabriel Santos', '2024003', 2, 5, 'Ativo'),
('Ana Julia Oliveira', '2024004', 3, 3, 'Ativo'),
('Pedro Henrique Lima', '2024005', 4, 6, 'Ativo'),
('Isabela Rodrigues', '2024006', 5, 3, 'Ativo'),
('Gabriel Almeida', '2024007', 6, 1, 'Ativo'),
('Sofia Martins', '2024008', 7, 4, 'Ativo'),
('Matheus Costa', '2024009', 1, 2, 'Trancado'),
('Laura Nascimento', '2024010', 2, 7, 'Ativo'),
('Rafael Pereira', '2024011', 3, 5, 'Ativo'),
('Valentina Barbosa', '2024012', 8, 5, 'Ativo'),
('Enzo Carvalho', '2024013', 1, 8, 'Ativo'),
('Helena Ribeiro', '2024014', 5, 6, 'Ativo'),
('Arthur Gomes', '2024015', 4, 2, 'Desistente');

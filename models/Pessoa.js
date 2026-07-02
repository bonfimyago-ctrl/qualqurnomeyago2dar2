class Pessoa {
  constructor(nome, datadeNascimento) {
    this.nome = nome;
    this.datadeNascimento = datadeNascimento;
  }

  cauculateIdade() {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.datadeNascimento.getFullYear();
    const diferencames = hoje.getMonth() - this.datadeNascimento.getMonth();
    const aniveraindanaochegou = diferencames < 0 || (diferencames === 0 && hoje.getDate() < this.datadeNascimento.getDate());
    if (aniveraindanaochegou) {
      idade--;
    }
    return idade;
  }
  toJSON() {
    return {
      nome: this.nome,
      datadeNascimento: this.datadeNascimento.toISOString().split('T')[0],
      idade: this.cauculateIdade()
    };
  }   
}


module.exports = Pessoa;
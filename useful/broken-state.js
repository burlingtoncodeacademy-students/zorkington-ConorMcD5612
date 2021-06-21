


class Transformer {
  constructor(name, form, team, altForms) {
    this.name = name
    this.form = form;
    this.team = team;
    this.altForms = altForms
  }

  changeTo(nextForm){
    
    if(this.altForms.includes(nextForm)) {
      this.form = nextForm
      console.log(`Transormed into ${nextForm}`)
    } else {
      console.log('ERROR, ERROR, INVALID FORM', nextForm)
    }
  }

  slogan() {
    if(this.team === 'decepticon') {
      console.log('Decepticons attack!')
    } else if(this.team === 'autobot') {
      console.log('Autobots roll out!')
    } else {
      console.log('run away')
    }
  }
}

let megatron = new Transformer('Megatron', 'robot', 'decepticon', ['t-rex', 'tank', 'jet', 'robot'])

let optimus = new Transformer('Optimus Prime', 'robot', 'autobot', ['truck', 'lamborghini', 'robot'])

let mark = new Transformer('Mark Whalberg', 'human', 'human', 'human')

megatron.changeTo('t-rex')
console.log(megatron.form)
megatron.changeTo('tank')
megatron.changeTo('jet')
megatron.changeTo('robot')
console.log(megatron.form)
megatron.changeTo('toaster')
console.log(megatron.form)
megatron.slogan()


optimus.changeTo('truck')
optimus.changeTo('lamborghini')
optimus.changeTo('robot')

optimus.slogan()

mark.changeTo('toaster')
console.log(mark.team)
mark.changeTo()
console.log(mark.altForms)
mark.slogan()

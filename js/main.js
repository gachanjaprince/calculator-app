const keys = document.querySelector('.calcButtons')

keys.addEventListener('click', event => {
    // Selecting for the target property in the Event object
    const {target} = event
    // Selecting for the value property/attribute of the selected target element/tag
    const {value} = target
    // Ensuring that ONLY buttons are responsible for inputing data
    if (!target.matches('button')) {
        return;
    } else {
        console.log(value)
        calculator.parseInput(value)
    }
})

const calculator = {
    displayText : '0',
    prevTotal: null,
    
    parseInput(value) {
        switch (value) {
            case '=':
                this.calcAnswer(this.displayText)
                break;
            case 'AC': 
                this.clearAll()

                break;
            case '.':
                if (this.displayText == 0) {
                    this.addText('0.')
                } else {
                    this.addText(value) // concat value to strng
                }
                break;
            default: 
                this.addText(value)
                break;
        }
    },

    addText(value) {
        if (this.displayText === '0') {
            this.displayText = ''
        } else if (this.prevTotal !== null) {
            this.displayText = this.prevTotal //Makes it so that, the value stired from preveious operation can be used to continue new/current operation
            this.prevTotal = null //Once prevTotal has been retrieved & assigned to diplayText, we can make it null
        }
        // Prohibit user from entering/proceeding with invalid sequence (i.e. 10++5 or 2+-5)
        if (isNaN(Number(value)) && isNaN(Number(this.displayText))) {
            if(isNaN(this.displayText.slice(-1))){
                return;
            }
        }
        this.displayText += value
        this.outputText(this.displayText)
    },

    outputText(text) {
        document.querySelector('.calcScreen').value = text
    },
    
    calcAnswer(equation) {
        let result = Function('return ' + equation)() // WTFFFFFFFFFFFFFFFFFFF
        this.outputText(result)
        this.displayText = result
    },

    clearAll() {
        this.displayText = '0'
        this.prevTotal = null
        this.outputText(this.displayText)
    }
}

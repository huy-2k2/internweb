
window.onload = function() {
    initialEvent()  
}

function initialEvent() {
    handleEventToggleMenu()
    handleEventToggleForm()
    handleSubmitLegacy()
    handleEventCancelForm()
    handleEventFormAdd()
}

function handleSubmitLegacy() {
    const form = document.querySelector('.form')
    const popupConfirmAdd = document.querySelector('#popup_add')
    form.onsubmit = function(e) {
        e.preventDefault()
        const fields = this.querySelectorAll('.field__validate')
        let isValid = true
        fields.forEach(field => {
            const input = field.querySelector('input')
            const value = input.value
            const types = field.getAttribute('types').split(" ")
            const fieldName = field.querySelector('.field__validate__label').innerText.toLowerCase()
            const errorElement = field.querySelector('.field__validate__error')
            const errors = validate(value, types, fieldName)
            errorElement.innerText = errors[0] || ""
            if(errors.length)
                isValid = false
        })

        if(isValid)
            popupConfirmAdd.classList.add('active')

    }
}

function validate(value, types, fieldName) {
    const errors = []
    const dateRegex =  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    types.forEach(type => {
        switch (type) {
            case "required":
                if(!value.length)
                    errors.push(`Cần nhập ${fieldName}.`)
                break;
            case "number":
                if(Number.isNaN(value))
                    errors.push(`${fieldName} phải là số.`)
                break;
            case "date":
                if(!dateRegex.test(value))
                    errors.push(`${fieldName} phải có định dạng dd/mm/yyyy.`)
                break;
            default:
                break;
        }
    })
    return errors;
}

function handleEventToggleForm() {
    const addButtons = document.querySelector('#btn_add_legacy')
    const closeButtons = document.querySelectorAll('.form__close')
    const popup = document.querySelector('#popup_form')
    
    addButtons.onclick = function() {
        popup.classList.add('active')
    }

   closeButtons.forEach(closeButton => {
        closeButton.onclick = function() {
            const confirmCancelPopup = document.querySelector('#popup_cancel')
            confirmCancelPopup.classList.add('active')
        }
   })
}

function handleEventFormAdd() {
    const popupConfirmAdd = document.querySelector('#popup_add')
    const nConfirmAdd = document.querySelector('#n_confirm_add')
    const nConfirmAddOut = document.querySelector('#n_confirm_add--out')
    const popup = document.querySelector('#popup_form')
    const confirmAddBtn = document.querySelector('#confirm_add')

    nConfirmAdd.onclick = function() {
        popupConfirmAdd.classList.remove('active')
    }
    nConfirmAddOut.onclick = function() {
        resetForm()
        popupConfirmAdd.classList.remove('active')
        popup.classList.remove('active')
    }
    confirmAddBtn.onclick = function() {
        resetForm()
        popupConfirmAdd.classList.remove('active')
        popup.classList.remove('active')
        handleSubmit()
    }

}

function handleSubmit() {
    const toastMessage = document.querySelector('.toastmessage')
    console.log(toastMessage);
    toastMessage.classList.add('active')
    setTimeout(() => {
        toastMessage.classList.remove('active')
    }, 3000)
}

function handleEventCancelForm() {
    const confirmCancelBtn = document.querySelector('#confirm_cancel')
    const nConfirmCancelBtn = document.querySelector('#n_confirm_cancel')
    const confirmCancelPopup = document.querySelector('#popup_cancel')
    const popup = document.querySelector('#popup_form')

    nConfirmCancelBtn.onclick = function() {
        confirmCancelPopup.classList.remove('active')
    }

    confirmCancelBtn.onclick = function() {
        resetForm()
        confirmCancelPopup.classList.remove('active')
        popup.classList.remove('active')
    }

}

function resetForm() {
    const inputs = document.querySelectorAll('.form input')
    const errors = document.querySelectorAll('.form .field__validate__error')
    inputs.forEach(input => {
        if(!input.hasAttribute('value'))
            input.value = ""
    })

    errors.forEach(error => {
        error.innerText = ""
    })
}

function handleEventToggleMenu() {
    const menu = document.querySelector('.menu')
    const btnCloseMenu = document.querySelector('.menu__footer__button--left')
    const btnOpenMenu = document.querySelector('.menu__footer__button--right')

    btnCloseMenu.onclick = function() {
        menu.classList.remove('active')
    }

    btnOpenMenu.onclick = function() {
        menu.classList.add('active')
    }
}


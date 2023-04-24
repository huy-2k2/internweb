window.onload = function() {
    initialEvent()
}

function initialEvent() {
    handleEventToggleMenu()
    handleEventToggleForm()
    handleSubmitLegacy()
    handleEventCancelForm()
    handleEventFormAdd()
    handleEventTableCheckbox()
    handleMultiDuplicateButton()
    handleMultiDeleteButton()
    handleOpenDeleteBtn()
}

function handleSubmitLegacy() {
    const form = document.querySelector('.form')
    const popupConfirmAdd = document.querySelector('#popup_add')
    form.onsubmit = function(e) {
        e.preventDefault()
        const fields = this.querySelectorAll('.field__validate')
        let isValid = true
        fields.forEach(field=>{
            const input = field.querySelector('input')
            const value = input.value
            const types = field.getAttribute('types').split(" ")
            const fieldName = field.querySelector('.field__validate__label').innerText.toLowerCase()
            const errorElement = field.querySelector('.field__validate__error')
            const errors = validate(value, types, fieldName)
            errorElement.innerText = errors[0] || ""
            if (errors.length) {
                isValid = false
                field.setAttribute('data-error', true)
            } else {
                field.removeAttribute('data-error')
            }
        }
        )

        if (isValid)
            popupConfirmAdd.classList.add('active')

    }
}

function validate(value, types, fieldName) {
    const errors = []
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
    types.forEach(type=>{
        switch (type) {
        case "required":
            if (!value.length)
                errors.push(`Cần nhập ${fieldName}.`)
            break;
        case "number":
            if (Number.isNaN(value))
                errors.push(`${fieldName} phải là số.`)
            break;
        case "date":
            if (!dateRegex.test(value))
                errors.push(`${fieldName} phải có định dạng dd/mm/yyyy.`)
            break;
        default:
            break;
        }
    }
    )
    return errors;
}


function handleEventToggleForm() {
    const addButtons = document.querySelector('#btn_add_legacy')
    const closeButtons = document.querySelectorAll('.form__close')
    const popup = document.querySelector('#popup_form')

    addButtons.onclick = function() {
        popup.classList.add('active')
    }

    closeButtons.forEach(closeButton=>{
        closeButton.onclick = function() {
            const confirmCancelPopup = document.querySelector('#popup_cancel')
            confirmCancelPopup.classList.add('active')
        }
    }
    )
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
    setTimeout(()=>{
        toastMessage.classList.remove('active')
    }
    , 3000)
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
    const fields = document.querySelectorAll('.field__validate')

    fields.forEach(field => field.removeAttribute('data-error'))

    inputs.forEach(input=>{
        if (!input.hasAttribute('value'))
            input.value = ""
    }
    )

    errors.forEach(error=>{
        error.innerText = ""
    }
    )
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

function handleEventTableCheckbox() {
    const checkboxHead = document.querySelector('.table #checkbox-head')
    const checkboxRows = document.querySelectorAll('.table__body .input_checkbox input')
    checkboxRows.forEach(checkboxRow => {
        checkboxRow.oninput = function() {
            let count = 0
            for(let i = 0; i < checkboxRows.length; i++) {
                if(checkboxRows[i].checked)
                    count++
            }
            checkboxHead.checked = count == checkboxRows.length            
        }
    })
    checkboxHead.oninput = function() {
        checkboxRows.forEach(checkboxRow => checkboxRow.checked = checkboxHead.checked)
    }
}

function handleMultiDuplicateButton() {
    const multiDuplicateBtn = document.querySelector('#multiDuplicateBtn')
    const tbody = document.querySelector('.table__body')
    multiDuplicateBtn.onclick = function() {
        let trs = [...document.querySelectorAll('.table__body tr')]
        let index = trs.length
        trs = trs.filter(tr => {
            const input_checkbox = tr.querySelector('.input_checkbox input')
            return input_checkbox.checked
        })
        trs.forEach(tr => {
            index++
            const newTr = tr.cloneNode(true)
            newTr.querySelector('td:nth-child(2)').innerText = index
            newTr.querySelector('.input_checkbox label').setAttribute('for', `checkbox-${index}`)
            newTr.querySelector('.input_checkbox input').setAttribute('id', `checkbox-${index}`)
            tbody.appendChild(newTr)
        })
        const inputs_checkbox = document.querySelectorAll('.input_checkbox input')
        inputs_checkbox.forEach(input => input.checked = false)
        handleEventTableCheckbox()
    }
} 

function handleMultiDeleteButton() {
    const confirmDeleteBtn = document.querySelector('#confirm_delete')
    const tbody = document.querySelector('.table__body')
    const popupDelete = document.querySelector('#popup_delete')
    confirmDeleteBtn.onclick = function() {
        let trs = [...document.querySelectorAll('.table__body tr')]
        const removeTrs = []
        let index = 1
        trs.forEach(tr => {
            const input_checkbox = tr.querySelector('.input_checkbox input')
            tr.querySelector('td:nth-child(2)').innerText = index
            tr.querySelector('.input_checkbox label').setAttribute('for', `checkbox-${index}`)
            input_checkbox.setAttribute('id', `checkbox-${index}`)
            if(input_checkbox.checked) {
                removeTrs.push(tr)
            } else {
                index++
            }
        })
        removeTrs.forEach(removeTr => tbody.removeChild(removeTr))
        handleEventTableCheckbox()
        popupDelete.classList.remove('active')
    }
}

function handleOpenDeleteBtn() {
    const multiDeleteBtn = document.querySelector('#multiDeleteBtn')
    const nConfirmDelete = document.querySelector('#n_confirm_delete')
    const popupDelete = document.querySelector('#popup_delete')
    multiDeleteBtn.onclick = function() {
        let trs = [...document.querySelectorAll('.table__body tr')]
        trs = trs.filter(tr => {
            const input_checkbox = tr.querySelector('.input_checkbox input')
            return input_checkbox.checked
        })
        if(!trs.length)
            return
        popupDelete.querySelector('.dialog__title').innerHTML = `<strong>${trs.length < 10? '0': ''}${trs.length}</strong> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?`
        popupDelete.classList.add('active')
    }
    nConfirmDelete.onclick = function() {
        popupDelete.classList.remove('active')
    }
}
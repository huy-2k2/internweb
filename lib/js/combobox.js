(() => {

    initEvent()

    function initEvent() {
        const comboboxs = document.querySelectorAll('.combobox')
        comboboxs.forEach((combobox) => {
            createInnerHtml(combobox)
            handleLoadData(combobox)
            handleEventToggleOptions(combobox)
            handleOnInput(combobox)
        })
    }

    function createInnerHtml(combobox) {
        combobox.innerHTML = `
            <label class="combobox__label" for=""><span class="field__validate__label">${combobox.getAttribute('data-label')}</span> ${combobox.getAttribute('data-required') ? '<span class="combobox__required"> *</span>': ''}</label>
            <div class="combobox__body">
                <div class="combobox__head">
                    <input placeholder="${combobox.getAttribute('data-placeholder')}" class="combobox__input" type="text">
                    <div class="combobox__icon">
                        <div class="icon-down"></div>
                    </div>
                </div>
                <div class="combobox__options custom-scrollbar">
                </div>
            </div>
            <span class="field__validate__error"></span>
        ` 
    }

    function handleLoadData(combobox) {
        const comboboxOptions = combobox.querySelector('.combobox__options')
        const url = combobox.getAttribute('data-url')
        const PropText = combobox.getAttribute('data-text') 
        const PropValue = combobox.getAttribute('data-value')
        fetch(url)
        .then(response => response.json())
        .then(dataArray => {
            combobox.setAttribute('data-options', dataArray)
            dataArray.forEach(data => {
                const div = document.createElement('div')
                div.classList.add('combobox__item')
                div.setAttribute('value', data[PropValue])
                div.innerText = data[PropText]
                handleEventSelectItem(div, combobox)
                comboboxOptions.appendChild(div)
            })
        }) 
    }

    function handleOnInput(combobox) {
        const comboboxInput = combobox.querySelector('.combobox__input')
        comboboxInput.oninput = function() {
            const options = combobox.querySelectorAll('.combobox__item')
            if(comboboxInput.value.trim()) {
                options.forEach(option => {
                    option.classList.remove('unactive')
                    if(!option.innerText.toLowerCase().includes(comboboxInput.value.toLowerCase())) {
                        option.classList.add('unactive')
                    }
                })
            } else {
                options.forEach(option => option.classList.remove('unactive'))
            }
        }
    }

    function handleEventSelectItem(item, combobox) {
        const comboboxInput = combobox.querySelector('.combobox__input')
        const comboboxOptions = combobox.querySelector('.combobox__options')

        item.onclick = function() {
            const text = item.innerText
            const value = item.getAttribute('value')
            comboboxInput.value = text
            comboboxInput.setAttribute('realValue', value)
            comboboxOptions.classList.remove('active')
        }
    }

    function handleEventToggleOptions(combobox) {
        const comboboxHead = combobox.querySelector('.combobox__head')
        const comboboxOptions = combobox.querySelector('.combobox__options')
        const comboboxInput = combobox.querySelector('.combobox__input')

        comboboxHead.onclick = function() {
            comboboxOptions.classList.add('active')
            comboboxInput.focus()
        }
        
        window.addEventListener('click', function(e) {
            if(!comboboxHead.contains(e.target) && !comboboxOptions.contains(e.target)) {
                const comboboxInput = combobox.querySelector('.combobox__input')
                comboboxOptions.classList.remove('active')
                const options = [...combobox.querySelectorAll('.combobox__item')]
                options.forEach(option => option.classList.remove('unactive'))
                const result = options.filter(option => option.getAttribute('value') == comboboxInput.getAttribute('realValue'))[0]
                if(comboboxInput.value.trim() && result)
                    comboboxInput.value = result.innerText
                else if(!comboboxInput.value.trim()) {
                    comboboxInput.value = ""
                    comboboxInput.removeAttribute('realValue')
                }
            }
        })

    }


})()
const colorForm = document.getElementById('color-form')
const colorSchemeContainer = document.getElementById('color-scheme-container')
       
document.addEventListener('click', async (e) => {
    if (e.target.dataset.color) {
        try {
            await navigator.clipboard.writeText(e.target.dataset.color)
            console.log('Text copied to clipboard!')
            // Optional: Provide visual feedback to the user
        } catch (err) {
            console.error('Failed to copy text: ', err)
            // Handle cases where clipboard access is denied
        }
    }

})

colorForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const colorFormData = new FormData(colorForm)
    const colorFormObj = Object.fromEntries(colorFormData)
    const hexColorWithoutHash = colorFormObj.color.substring(1)
    const colorScheme = colorFormObj.scheme
    let colorSchemeHtml = ``

    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColorWithoutHash}&mode=${colorScheme}&count=5`)
    .then(response => response.json())
    .then(data => {
        for (let color of data.colors) {
            const colorIndex = data.colors.indexOf(color)
            const colorHex = color.hex.value
            document.getElementById(`color-swatch-${colorIndex}`).style.backgroundColor = colorHex
            colorSchemeHtml += `
                <div class="swatch-container" id="swatch-container">
                    <div class="swatch color-swatch-${colorIndex}" id="color-swatch-${colorIndex}" data-color="${colorHex}"></div>
                    <p class="hex-text" id="hex-text-${colorIndex}" data-color="${colorHex}">${colorHex}</p>
                </div>
        `
        }

        colorSchemeContainer.innerHTML = colorSchemeHtml

        data.colors.forEach((color, index) => {
            const colorHex = color.hex.value
            document.getElementById(`color-swatch-${index}`).style.backgroundColor = colorHex
        })
    })
})

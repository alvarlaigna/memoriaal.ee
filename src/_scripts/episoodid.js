const gscriptBase = 'https://script.google.com/macros/s'
const feedbackApiId =
    'AKfycbyRe0i0Q4g9cqOg0Dxt2Da3KqmXzTSYutb141G5AHAlt3N9P84LgGrj0awcPqjCMJKWWA'
const feedbackApi = `${gscriptBase}/${feedbackApiId}/exec`
const episodesApiId =
    'AKfycbyRe0i0Q4g9cqOg0Dxt2Da3KqmXzTSYutb141G5AHAlt3N9P84LgGrj0awcPqjCMJKWWA'
const episodesApi = `${gscriptBase}/${episodesApiId}/exec`


document.addEventListener('DOMContentLoaded', function () {
    populateEpisodes()
    const submitE = get('db-feedback-submit')
    submitE.addEventListener('click', submitEpisode)
})
document.onkeydown = function (evnt) {
    if (evnt.key === "Escape") {
        closeModal()
    }
}

closeModal = () => {
    get('popup-content').classList.add('d-none')
    get('popup-background').classList.add('d-none')
}

const populateEpisodes = async () => {
    const episodes = await getEpisodes()
    const select = document.getElementById('db-feedback-episode-select')
    episodes.forEach(episode => {
        const option = document.createElement('option')
        option.value = episode.id
        option.text = `${episode.Nimetus} (${episode.Allikas})`
        select.appendChild(option)
    })
    // if selected episode in local storage, set it
    const selectedEpisode = localStorage.getItem('selectedEpisode')
    if (selectedEpisode) {
        select.value = selectedEpisode
    }
}

const getEpisodes = async () => {
    try {
        const response = await fetch(episodesApi)
        return await response.json()
    } catch (err) {
        throw err
    }
}

const submitEpisode = (evnt) => {

    // get selected episode
    const episodeId = get('db-feedback-episode-select').value
    // save selected episode to local storage
    localStorage.setItem('selectedEpisode', episodeId)
    const xhr2 = new XMLHttpRequest()
    xhr2.open('POST', feedbackApi, true)

    xhr2.onload = function () { // request successful
        console.log('response', xhr2.responseText)
        closeModal()
    }

    xhr2.onerror = function () {
        console.log('Error:', xhr2.status)
    }
    const formData = new FormData(formE)
    // add current url to form data
    formData.append('url', window.location.href)
    // add user language to form data
    formData.append('nav_lang', navigator.language)
    // get html lang property
    formData.append('locale', document.documentElement.lang)

    xhr2.send(formData)
    evnt.preventDefault()
}

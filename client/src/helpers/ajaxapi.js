const getAllStories = async () => {
    return fetch('/api/stories')
        .then(res => res.json())
        .catch(err => console.log(err))
}

export {getAllStories};
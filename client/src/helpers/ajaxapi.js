const getAllStories = async () => {
    return fetch('/api/stories')
        .then(res => res.json())
        .catch(err => console.log(err));
}

const saveStory = async (story) => {
    return fetch(`/api/stories/${story._id}`, {
        method: 'PUT',
        body: JSON.stringify(story),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

export {
    getAllStories
    , saveStory
};
const getAllStories = async () => {
    return fetch('/api/stories')
        .then(res => res.json())
        .catch(err => console.log(err));
}

const saveStory = async (story) => {
    const id = story._id;
    story._id = undefined;
    return fetch(`/api/stories/${id}`, {
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
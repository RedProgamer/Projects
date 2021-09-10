// API key: d8bc380dc2d34eaf03ab0d5d2db6d33f02fb8a87

class Github {
    constructor() {
        this.client_id = '60ccc031d628e528474f';
        this.api_key = 'd8bc380dc2d34eaf03ab0d5d2db6d33f02fb8a87'
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.api_key}`);
        const repositoryReponse = await fetch(`https://api.github.com/users/${user}/repos?client_id=${this.client_id}&client_secret=${this.api_key}`)

        const profile = await profileResponse.json();
        const repository = await repositoryReponse.json();

        return {
            profile,
            repository
        }
    }
}
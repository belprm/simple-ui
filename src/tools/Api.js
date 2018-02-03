const api = "https://livedemo.xsolla.com/fe/test-task/baev";

export default class Api {
    static listUsers(query) {
        return fetch(`${api}/users?${query}`)
            .then(response => response.json())
            .then(data => {
                return data || [];
            });
    }

    static createUser(payload) {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const init = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        };

        return fetch(`${api}/users`, init)
            .then(response => response.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (err) {
                    return text;
                }
            })
    }
}
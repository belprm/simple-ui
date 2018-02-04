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

    static getUser(user_id) {
        return fetch(`${api}/users/${user_id}`)
            .then(response => response.json())
            .then(data => {
                return data || [];
            });
    }

    static updateUser(payload) {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const init = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(payload)
        };

        return fetch(`${api}/users/${payload.user_id}`, init)
            .then(response => response.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (err) {
                    return text;
                }
            })
    }

    static getUserTransactions(user_id) {
        return fetch(`${api}/users/${user_id}/transactions?datetime_from=2014-10-14T00%3A00%3A00Z&datetime_to=2019-10-15T00%3A00%3A00Z`)
            .then(response => response.json())
            .then(data => {
                return data || [];
            });
    }

    static updateBalance(payload) {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        const init = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        };

        return fetch(`${api}/users/${payload.user_id}/recharge`, init)
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
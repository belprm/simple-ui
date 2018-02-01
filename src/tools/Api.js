const api = "https://livedemo.xsolla.com/fe/test-task/baev";

export default class Api {
    static users(query) {
        return fetch(`${api}/users?${query}`)
            .then(response => response.json())
            .then(data => {
                return data || [];
            });
    }
}
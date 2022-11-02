/* eslint-disable no-unused-vars */

import axios from "axios";
const token = localStorage.getItem("user-token");

// const link = "http://vue.xaed4360.odns.fr/public/api/";
const link = "/api/";
export const loggedIn = user =>
    new Promise((resolve, reject) => {
        axios({
                url: link + "login",
                data: user,
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json"
                }
            })
            .then(response => {
                // store the token in localstorage
                localStorage.setItem("token", response.data.data.token);
                resolve(response);
            })
            .catch(err => {
                // store the token in localstorage
                localStorage.removeItem("token");
                reject(err);
            });
    });

export const loggedOut = user =>
    new Promise((resolve, reject) => {
        axios({
                url: link + "logout",
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(response => {
                localStorage.removeItem("token");
                localStorage.removeItem("agence");
                localStorage.removeItem("institut");
                localStorage.removeItem("role");
                delete axios.defaults.headers.common["Authorization"];
                resolve(response);
            })
            .catch(err => {
                // store the token in localstorage
                localStorage.removeItem("token");
                reject(err);
            });
    });
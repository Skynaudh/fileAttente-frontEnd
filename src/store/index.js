import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
/* eslint-disable */
Vue.use(Vuex);




// var url = 'http://vue.xaed4360.odns.fr/public/api/';
var url = '/api/';


/**
 * 
 * @param {context} context 
 * @param {*uri de base pour la premiere requete} uri 
 * @param {* parametres d'envoi de la premiere requete} params 
 * @param {*deuxieme uri pour faire la demiere requete} secondUri 
 * @param {*nom de la mutation a faire apres la recuperation de la liste} MutationName 
 */
function postAndGet(context, uri, params, secondUri, MutationName) {

    axios.post(url + uri, params, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(() => {
            getApi(context, secondUri, MutationName);
        })
        .catch(error => console.log(error));

}
// function postAndPost(context, uri, params, secondUri, SecondParams, MutationName){
//   axios.post(url + uri, params,{ headers: {
//     "Access-Control-Allow-Origin" : "*",
//     "Content-type": "Application/json",
//     "Authorization": 'Bearer '+ Token()
//     }} )
//       .then(() => {
//         onlyPost(context, secondUri, SecondParams, MutationName);
//       })
//       .catch(error => console.log(error));
// }


/**
 * 
 * @param {context} context 
 * @param {* uri de base pour la requete } uri 
 * @param {* parametres de la requete} params 
 * @param {* nom de la mutation a faire apres la la requete} MutationName 
 */

function Token() {
    var token = localStorage.getItem('token')
    return token;
}

// const httpClient = axios.create({
//     baseURL: process.env.VUE_APP_BASEURL,
//     headers: {
//         "Content-type": "Application/json",
//         "Authorization": 'Bearer ' + localStorage.getItem('token')
//     }

// })

function onlyPost(context, uri, params, MutationName) {
    axios.post(url + uri, params, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => {
            context.commit(MutationName, response.data.data);
            return response;
        })
        .catch(error => { console.log(error) });

}



/**
 * 
 * @param {*context} context 
 * @param {*uri de la requete} uri 
 * @param {*nom de la mutation a faire apres la requete} mutationName 
 */
function getApi(context, uri, mutationName) {
    axios.get(url + uri, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data.data);
            context.commit(mutationName, response.data.data)
        })
        .catch(error => console.log(error));

}













export default new Vuex.Store({

    /**********************------------------------------------------***************************** */

    /*     **  S T A T E   **      */

    /**********************------------------------------------------***************************** */
    state: {
        statut: '',
        token: localStorage.getItem('token') || '',
        user: {},

        typeInstitution: null,
        institution: null,
        Institution: null,
        ancienTypeInstitution: null,
        ancienneInstitution: null,
        ville: null,
        ancienneVille: null,
        ancienneAgence: null,
        agence: null,
        phoneAgence: null,
        longitude: null,
        latitude: null,
        country: null,
        services: null,
        service: null,
        guichet: null,
        username: null,
        password: null,
        nomAdmin: null,
        adrAdmin: null,
        phoneAdmin: null,
        emailAdmin: null,
        type: null,
        Admin: null,
        agent: null,
        agents: null,
        role: null,
        admin: null,
        permission: null,
        ticket: null,
        GAB: null,
        ecranskip: null,
        GuichetReel: null,
        ecran: ''
    },



    /**********************------------------------------------------***************************** */

    /*     **  G E T T E R S   **      */

    /**********************------------------------------------------***************************** */


    getters: {
        allTypeInstitution: (state) => {
            return state.typeInstitution;
        },
        allInstitution: (state) => {
            return state.Institution;
        },
        allVille: (state) => {
            return state.ville;
        },
        getListeAgenceByInstitut: (state) => {
            return state.agence;
        },
        allPays: (state) => {
            return state.country;
        },
        getListeVilleByPays: (state) => {
            return state.ville;
        },
        allService: (state) => {
            return state.services
        },
        getInfoUsers: () => {
            infoUsers();
        },
        allAgent: (state) => {
            return state.agent;
        },
        allAgents: (state) => {
            return state.agents;
        },
        allRole: (state) => {
            return state.role;
        },
        getGuichet: (state) => {
            return state.guichet;
        },
        allAdmin: (state) => {
            return state.admin;
        },
        allPermission: (state) => {
            return state.permission;
        },
        getService: (state) => {
            return state.service;
        },
        allAgence: (state) => {
            return state.agence;
        },
        allEcran: (state) => {
            return state.ecran;
        },
        allSkipTicket: (state) => {
            return state.ticket;
        },
        allGAB: (state) => {
            return state.GAB;
        },
        allEcranSkip: (state) => {
            return state.ecranskip;
        },
        allGuichetReel: (state) => {
            return state.GuichetReel;
        },




        isLoggedIn: state => !!state.token,
        authStatut: state => state.statut
    },


    /**********************------------------------------------------***************************** */

    /*     **  M U T A T I O N   **      */

    /**********************------------------------------------------***************************** */

    mutations: {

        auth_request: (state) => {
            state.statut = 'loading'
        },
        auth_success: (state, token, user) => {
            state.statut = 'success';
            state.token = token;
            state.user = user;
        },
        auth_error: (state) => {
            state.statut = 'error'
        },
        logout: (state) => {
            state.statut = '';
            state.token = '';
        },


        recupererInstitutionType: (state, payload) => {
            state.typeInstitution = payload
        },
        recupererInstitution: (state, payload) => {
            state.Institution = payload
        },
        recupererVille: (state, payload) => {
            state.ville = payload;
        },
        recupererAgence: (state, payload) => {
            state.agence = payload
        },
        recupererPays: (state, payload) => {
            state.country = payload
        },
        recupererService: (state, payload) => {
            state.service = payload;
        },
        recupererServices: (state, payload) => {
            state.services = payload;
        },
        recupererGuichet(state, payload) {
            state.guichet = payload;
        },
        recupererAdmin: (state, payload) => {
            state.Admin = payload;
        },
        recupererAgent: (state, payload) => {
            state.agent = payload;
        },
        recupererAgents: (state, payload) => {
            state.agents = payload;
        },
        recupererRole: (state, payload) => {
            state.role = payload;
        },
        recupererAdmin: (state, payload) => {
            state.admin = payload;
        },
        recupererPermission: (state, payload) => {
            state.permission = payload;
        },
        recupererTicket: (state, payload) => {
            state.ecran = payload;
        },
        recupererEcranSkip: (state, payload) => {
            state.ecranskip = payload;
        },
        recupererSkipTicket: (state, payload) => {
            state.ticket = payload;
        },
        recupererGAB: (state, payload) => {
            state.GAB = payload;
        },
        recupererGuichetReel: (state, payload) => {
            state.GuichetReel = payload;
        }



    },


    /**********************------------------------------------------***************************** */

    /*     **  A C T I O N S   **      */

    /**********************------------------------------------------***************************** */


    actions: {


        ajoutType: (context, params) => {
            postAndGet(context, 'addInstitutionType', params, 'listeInstitutionType', "recupererInstitutionType");
        },

        getListe: (context) => {
            getApi(context, "listeInstitutionType", "recupererInstitutionType");
        },

        modifierInstitutItem: (context, params) => {
            postAndGet(context, "updateInstitutionType", params, "listeInstitutionType", "recupererInstitutionType")
        },
        supprimeType: (context, params) => {
            onlyPost(context, "deleteInstitutionType", params, "recupererInstitutionType");
        },

        ajoutInst: (context, params) => {
            postAndGet(context, 'addInstitution', params, "listeInstitution", "recupererInstitution");
        },
        ModifierInst: (context, params) => {
            postAndGet(context, 'updateInstitution', params, "listeInstitution", "recupererInstitution");
        },
        ajoutVille: (context, params) => {
            postAndGet(context, "addVille", params, "listeVille", "recupererVille");
        },
        getVille: (context) => {
            getApi(context, "listeVille", "recupererVille");
        },
        modifierVille: (context, params) => {
            postAndGet(context, "updateVille", params, "listeVille", "recupererVille");
        },
        getListeInst: (context) => {
            getApi(context, "listeInstitution", "recupererInstitution");
        },
        getListePays: (context) => {
            getApi(context, "listeCountry", "recupererPays");
        },
        getVilleByPays: (context, params) => {
            onlyPost(context, "listeVilleByCountry", params, "recupererVille");
        },
        getListeAgenceByInstitut: (context, params) => {
            onlyPost(context, "listeAgenceByInstitution", params, "recupererAgence");
        },
        ajoutAgence: (context, params) => {
            onlyPost(context, "addAgence", params, "recupererAgence");
            onlyPost(context, "listeAgenceByInstitution", params, "recupererAgence");
        },
        modifierAgence: (context, params) => {
            onlyPost(context, "updateAgence", params, "recupererAgence");
        },
        supprimerInstitution: (context, params) => {
            postAndGet(context, "deleteInstitution", params, "listeInstitution", "recupererInstitution");
        },
        getServiceByInstitution: (context, params) => {
            onlyPost(context, "findServiceByInstitution", params, "recupererService");
        },
        getServiceByAgence: (context, params) => {
            onlyPost(context, "listeServiceToAgence", params, "recupererServices");
        },
        AjoutService: (context, params) => {
            onlyPost(context, "addService", params, "recupererService");
            onlyPost(context, "findServiceByInstitution", params, "recupererService");
        },
        ajoutGuichet: (context, params) => {
            onlyPost(context, "addCounter", params, "recupererGuichet");
            onlyPost(context, "listeCounterByAgence", params, "recupererGuichet");
        },
        getGuichet: (context, params) => {
            onlyPost(context, "listeCounterByAgence", params, "recupererGuichet");
        },
        ajoutAdmin: (context, params) => {
            postAndGet(context, "addAgent", params, "getAdminInstitution", "recupererAdmin");
        },
        getListeAgent: (context, params) => {
            onlyPost(context, "listAgentByInstitution", params, "recupererAgents");
        },
        getListeAgentAgence: (context, params) => {
            onlyPost(context, "listAgentByAgence", params, "recupererAgent");
        },
        getListeRole: (context) => {
            getApi(context, "listRole", "recupererRole");
        },
        ajoutAgent: (context, params) => {
            onlyPost(context, "addAgent", params, "recupererAgent");
        },
        getListeAdmin: (context) => {
            getApi(context, "getAdminInstitution", "recupererAdmin");
        },
        getListePermission: (context) => {
            getApi(context, "listePermission", "recupererPermission");
        },
        affecterService: (context, params) => {
            onlyPost(context, "affecterServiceToAgence", params, "recupererService");
        },
        affecterAgentGuichet: (context, params) => {
            onlyPost(context, 'affecterAgentToCounter', params, "recupererAgent");
        },
        getListeService: (context, params) => {
            onlyPost(context, "listeServiceToAgence", params, "recupererService");
        },
        affecterGuichet: (context, params) => {
            onlyPost(context, "affecterServiceToCounter", params, "recupererGuichet");
        },
        getGuichetService: (context, params) => {
            onlyPost(context, "listeCounterServiceByAgence", params, "recupererGuichet");
        },
        nextScreen: (context, params) => {
            onlyPost(context, "nextEcran", params, "recupererTicket");
        },
        skipTicket: (context, params) => {
            onlyPost(context, "skipTicket", params, "recupererSkipTicket");
        },
        listeTicketSkip: (context, params) => {
            onlyPost(context, "listeskipTicket", params, "recupererSkipTicket");
        },
        retourSkipTicket: (context, params) => {
            onlyPost(context, "EcranSkip", params, "recupererEcranSkip");
        },
        ChangeService: (context, params) => {
            onlyPost(context, "changeCounterofService", params, "recupererservice");
        },
        ajoutGAB: (context, params) => {
            onlyPost(context, "addGab", params, "recupererGAB");
        },
        listeGAB: (context, params) => {
            onlyPost(context, "listeGabByInstitution", params, "recupererGAB");
        },
        getGuichetReel: (context, params) => {
            onlyPost(context, "listeCounterReelByAgence", params, "recupererGuichetReel")
        },
        changerStatut: (context, params) => {
            onlyPost(context, "changestatutofService", params);
        },
        ajoutRole: (context, params) => {
            onlyPost(context, "addRole", params);
        },





        // loginAgent({commit}, user){
        //   return new Promise((resolve, reject) => {
        //     commit('auth_request')
        //     axios({url: 'http://192.168.1.105:8000/api/login', data: user, method: 'POST'})
        //     .then(response => {
        //       const token = response.data.data.token
        //       const user = response.data.data.information
        //              const institut = response.data.data.information.institution;
        //              const agence = response.data.data.information.agence;
        //              const role = response.data.data.role;
        //              const service = response.data.data.service;
        //              const guichet = response.data.data.guichet;
        //               localStorage.setItem('guichet', guichet);
        //               const idAgent = response.data.data.information.agentId;

        //             localStorage.setItem('idAgent', idAgent);
        //            const name = response.data.data.information.name;
        //            localStorage.setItem('service', service)
        //              localStorage.setItem('institut', institut)
        //              localStorage.setItem('agence', agence)
        //              localStorage.setItem('role', role)
        //              localStorage.setItem('name', name)
        //       localStorage.setItem('token', token)
        //       axios.defaults.headers.common['Authorization'] = token
        //       commit('auth_success', token, user)
        //       resolve(response)
        //     })
        //     .catch(error => {
        //       commit('auth_error')
        //       localStorage.removeItem('token')
        //       reject(error)
        //     })
        //   })
        // },
        login({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: 'http://vue.xaed4360.odns.fr/public/api/login', data: user, method: 'POST' })
                    .then(response => {
                        const token = response.data.data.token
                        const user = response.data.data.information
                        const institut = response.data.data.information.institution;
                        const agence = response.data.data.information.agence;
                        const role = response.data.data.role;
                        const name = response.data.data.information.name;
                        localStorage.setItem('institut', institut)
                        localStorage.setItem('agence', agence)
                        localStorage.setItem('role', role)
                        localStorage.setItem('name', name)
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },
        loginAdmin({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({ url: '/api/loginAdmin', data: user, method: 'POST' })
                    .then(response => {
                        const token = response.data.data.token
                        const user = response.data.data.information
                        const role = response.data.data.role;
                        const name = response.data.data.information.name;
                        localStorage.setItem('role', role)
                        localStorage.setItem('name', name)
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = token
                        commit('auth_success', token, user)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                    })
            })
        },

        // logout({commit}){
        //   return new Promise((resolve, reject) =>{
        //     commit('logout')
        //     axios({url: 'http://192.168.1.105:8000/api/logout'}, { headers: {
        //       "Access-Control-Allow-Origin" : "*",
        //       "Content-type": "Application/json",
        //       "Authorization": 'Bearer '+ Token()
        //       }})
        //     localStorage.removeItem('token')
        //     delete axios.defaults.headers.common['Authorization']
        //     resolve()
        //   })
        // }





    },





});
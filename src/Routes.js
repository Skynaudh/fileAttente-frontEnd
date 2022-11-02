import dashboard from "./components/dashboard.vue";
import auth from "./components/auth.vue";
import Institution from "./components/Institution.vue";
import agence from "./components/agence.vue";
import Utilisateur from "./components/Utilisateur.vue";
import TypeInstitution from "./components/TypeInstitution.vue";
import ville from "./components/ville.vue";
import Administration from "./components/Administration.vue";
import Guichet from "./components/Guichet.vue";
import ecran from "./components/ecran.vue";
// import serviceInstitution from "./components/serviceInstitution.vue";
import serviceAgence from "./components/serviceAgence.vue";
import ajoutInst from "./components/Institu/ajoutInst.vue";
import ajoutAgence from "./components/agence/ajoutAgence.vue";
import ajoutUtilisateur from "./components/utilisateur/ajoutUtilisateur.vue";
import ajoutAgent from "./components/utilisateur/ajoutAgent.vue";
import ajoutRole from "./components/role/ajoutRole.vue";
import ajoutAdmin from "./components/Admin/ajoutAdmin.vue";
import role from "./components/role.vue";
import EspaceGuichet from "./components/EspaceGuichet.vue";
import serviceInstitution from "./components/serviceInstitution.vue";
// import statistique from "./components/statistique.vue";
import loginEcran from "./components/loginEcran.vue";
import listeGuichet from "./components/listeGuichet.vue";
import Agent from "./components/Agent.vue";
import GAB from "./components/GAB.vue";
// import store from "./store";

// routes.beforeEach((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next();
//       return;
//     }
//     next("/auth");
//   } else {
//     next();
//   }
// });

export const routes = [{
        path: "/",
        component: auth
    },
    {
        path: "/ajoutAdmin",
        component: ajoutAdmin
    },
    {
        path: "/ecran",
        component: ecran
    },
    // {
    //   path: "/statistique",
    //   component: statistique
    // },
    {
        path: "/GAB",
        component: GAB
    },
    {
        path: "/loginEcran",
        component: loginEcran
    },
    {
        path: "/EspaceGuichet",
        component: EspaceGuichet
    },
    {
        path: "/serviceInstitution",
        component: serviceInstitution
    },
    {
        path: "/dashboard",
        component: dashboard
    },
    {
        path: "/TypeInstitution",
        component: TypeInstitution
    },
    {
        path: "/listeGuichet",
        component: listeGuichet
    },

    {
        path: "/agence",
        component: agence
    },
    {
        path: "/ajoutRole",
        component: ajoutRole
    },

    {
        path: "/Utilisateur",
        component: Utilisateur
    },

    // {
    //   path: "/serviceInstitution",
    //   component: serviceInstitution
    // },
    {
        path: "/serviceAgence",
        component: serviceAgence
    },
    {
        path: "/role",
        component: role
            // beforeEnter: (to, from, next) => {
            //   if(this.isSuper()){
            //     next()
            //   }
            //   else{
            //     alert("Impossible de voir cette page");
            //   }
            // }
    },
    {
        path: "/ajoutInst",
        component: ajoutInst
    },
    {
        path: "/ajoutAgence",
        component: ajoutAgence
    },
    {
        path: "/ajoutUtilisateur",
        component: ajoutUtilisateur
    },
    {
        path: "/ajoutAgent",
        component: ajoutAgent
    },
    {
        path: "/Institution",
        component: Institution
    },
    {
        path: "/Administration",
        component: Administration
    },
    {
        path: "/ville",
        component: ville
    },
    {
        path: "/Agent",
        component: Agent
    },
    {
        path: "/Guichet",
        component: Guichet
    }
];
export default class Portail {
  constructor(role) {
    this.role = role;
  }

  isAdmin() {
    return this.role === "AdministrateurInstitution";
  }
  isSuper() {
    return this.role === "SuperAdministrateur";
  }
  isChefAgence() {
    return this.role === "ChefAgence";
  }
  isAgent() {
    return this.role === "Agent";
  }
}

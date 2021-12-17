export class OrganizationModel {
    id: bigint;
    tariffId: bigint;
    nameOrganization: string;
    description: string;
    contacts: any;
    logoId: bigint;
    country: bigint;
    city: bigint;
    imageSrc: string;
    address: string;

    constructor(organizationModel) {
        this.id = organizationModel.id;
        this.tariffId = organizationModel.tariffId;
        this.nameOrganization = organizationModel.nameOrganization;
        this.description = organizationModel.description;
        this.contacts = organizationModel.contacts;
        this.logoId = organizationModel.logoId;
        this.country = organizationModel.country;
        this.city = organizationModel.city;
        this.imageSrc = organizationModel.imageSrc;
        this.address = organizationModel.address;
    }

    get name() {
        let name = '';

        if (this.description) {
            name = this.description;
        } else if (this.nameOrganization) {
            name = this.nameOrganization;
        }

        return name;
    }

    set name(value) {
    }
}

export class OrganizationModel {
    id: bigint;
    tariff_id: bigint;
    nameOrganization : string;
    description: string;
    contacts: any;
    logo_id: bigint;
    country: bigint;
    city: bigint;
    imageSrc: string;
    address: string;

    constructor(organizationModel) {
        this.id = organizationModel.id;
        this.tariff_id = organizationModel.tariff_id;
        this.nameOrganization = organizationModel.nameOrganization;
        this.description = organizationModel.description;
        this.contacts = organizationModel.contacts;
        this.logo_id = organizationModel.logo_id;
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

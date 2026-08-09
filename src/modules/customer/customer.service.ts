import customerRepository from "./customer.repository.js";

class CustomerService {

    createCustomer(data: any) {
        return customerRepository.create(data);
    }

    getCustomers() {
        return customerRepository.getAll();
    }

    getCustomer(id: string) {
        return customerRepository.findById(id);
    }

    getCustomerByPhone(phone: string) {
        return customerRepository.findByPhone(phone);
    }

    updateCustomer(id: string, data: any) {
        return customerRepository.update(id, data);
    }

    deleteCustomer(id: string) {
        return customerRepository.delete(id);
    }
}

export default new CustomerService();
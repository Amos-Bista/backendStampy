import Customer from "./customer.model.js";

class CustomerRepository {

    create(data: any) {
        return Customer.create(data);
    }

    findById(id: string) {
        return Customer.findById(id);
    }

    findByPhone(phone: string) {
        return Customer.findOne({ phone });
    }

    getAll() {
        return Customer.find();
    }

    update(id: string, data: any) {
        return Customer.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
    }

    delete(id: string) {
        return Customer.findByIdAndDelete(id);
    }



}

export default new CustomerRepository();
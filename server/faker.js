import faker from 'faker'

export default (userId) => {
  faker.seed(userId)
  const profile = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    jobTitle: faker.name.jobTitle(),
    companyName: faker.company.companyName(),
    county: faker.address.county(),
    city: faker.address.city(),
    avatar: faker.image.avatar(),
    phone: faker.phone.phoneNumberFormat(),
    email: faker.internet.email()
  }
  return profile
}

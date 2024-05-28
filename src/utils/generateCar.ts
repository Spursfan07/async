const carNames = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Volkswagen',
  'Nissan',
  'Subaru',
  'Mazda',
  'Hyundai',
  'Kia',
  'Lexus',
  'Porsche',
  'Jaguar',
  'Land Rover',
  'Volvo',
  'Tesla',
  'Buick',
  'Cadillac',
  'Chrysler',
  'Dodge',
  'Fiat',
  'Alfa Romeo',
  'Mitsubishi',
  'Infiniti',
  'Acura',
  'GMC',
  'Jeep',
]

const genereateCar = () => {
  return carNames[Math.floor(Math.random() * carNames.length)]
}

export default genereateCar

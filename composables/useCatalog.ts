import { Product } from '~/types/Product'

// Simple sleep utility to simulate API latency
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const fixtures: Product[] = [
  {
    id: 1,
    name: 'Goldbären Maxi Pack 360 g',
    description: 'Classic fruit gummies in a 360 g maxi pack.',
    price: 129.99,
    sku: 'ACM-WH-001',
    brand: 'HARIBO',
    image:
      'https://dm.emea.cms.aldi.cx/is/image/aldiprodeu/product/jpg/scaleWidth/250/5cf10b90-96e9-4a1b-981d-4e40494152cd/HARIBO%20Goldbren%20Maxi%20Pack%20360%20g'
  },
  {
    id: 2,
    name: 'Original 1,25 l',
    description: 'Coca‑Cola Original Taste, 1.25 l PET bottle.',
    price: 199.0,
    sku: 'STL-SW-200',
    brand: 'COCA-COLA',
    image:
      'https://dm.emea.cms.aldi.cx/is/image/aldiprodeu/product/jpg/scaleWidth/250/55b93530-09c7-4e84-a6f4-a327d4565a94/CocaCola%20Original%20125%20l'
  },
  {
    id: 3,
    name: 'Tomatenmark 200 g',
    description: 'Concentrated tomato paste, 200 g.',
    price: 89.5,
    sku: 'NMB-MK-075',
    brand: 'KINGS CROWN',
    image:
      'https://dm.emea.cms.aldi.cx/is/image/aldiprodeu/product/jpg/scaleWidth/250/18ec189a-6825-498d-9350-096ccec8f759/Tomatenmark%20200%20g'
  },
  {
    id: 4,
    name: 'Almighurt 150 g, Erdbeere',
    description: 'Creamy strawberry yogurt, 150 g cup.',
    price: 49.99,
    sku: 'PHT-UC-065',
    brand: 'EHRMANN',
    image:
      'https://dm.emea.cms.aldi.cx/is/image/aldiprodeu/product/jpg/scaleWidth/250/161dc18e-2a2d-40ac-93eb-212de10a9183/Almighurt%20150%20g%20Erdbeere'
  },
  {
    id: 5,
    name: 'Prosciutto Crudo 100 g',
    description: 'Creamy strawberry yogurt, 150 g cup.',
    price: 1.49,
    sku: 'PHT-UC-035',
    brand: 'CUCINA',
    image:
      'https://dm.emea.cms.aldi.cx/is/image/aldiprodeu/product/jpg/scaleWidth/250/66d82a32-55a6-4231-b091-b737efdb1d3b/CUCINA%20Prosciutto%20Crudo%20100%20g'
  },
  {
    id: 6,
    name: 'NOBILE Mascarpone 250 g',
    description: 'Creamy strawberry yogurt, 150 g cup.',
    price: 1.99,
    sku: 'PHT-UC-069',
    brand: 'CUCINA',
    image:
      'https://dm.emea.cms.aldi.cx/is/image/aldiprodeu/product/jpg/scaleWidth/250/54acfd9b-6688-474d-a6cf-d24d3810dcf6/NOBILE%20Mascarpone%20250%20g'
  }
]

export interface UseCatalog {
  products: Array<Product>
  load: () => Promise<void>
  loadById: (id: number) => Promise<Product | undefined>
}

export const useCatalog = (): UseCatalog => {
  const products: Array<Product> = []

  const load = async () => {
    await sleep(500)
    // Replace current products with fixtures content
    products.splice(0, products.length, ...fixtures)
  }

  const loadById = async (id: number): Promise<Product | undefined> => {
    await sleep(500)
    return fixtures.find((p) => p.id === id)
  }

  return {
    products,
    load,
    loadById
  }
}

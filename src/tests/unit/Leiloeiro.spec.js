import { mount } from '@vue/test-utils'
import Leiloeiro from '@/views/Leiloeiro'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
    produto: 'Livro - VueJs',
    lanceInicial: 50,
    descricao: 'Livro bem bacana sobre Vue'
}

const lances = [
    {
        id: 1,
        valor: 1001,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 2,
        valor: 1005,
        data: '2020-06-13T18:04:26.826Z',
        leilao_id: 1
    },
    {
        id: 3,
        valor: 1099,
        data: '2020-06-13T18:19:44.871Z',
        leilao_id: 1
    }
]

describe('Leiloeiro inicia um leilão que não possui lances', () => {
    test('avisa quando não existem lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce([])
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true)
    })
})

describe('um leioleior exibe os lances existentes', () => {
    test('nao mostra o aviso de "sem lances"', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(false)
    })
    test('possui uma lista de lances', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const alerta = wrapper.find('.list-inline')

        expect(alerta.exists()).toBe(true)
    })
})

describe('um leiloeiro comunica os valores de menor e maior lance', () => {
    test('mostra o maior lance daquele leilao', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const maiorLance = wrapper.find('.maior-lance')

        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099')
    })
    test('mostra o menor lance daquele leilao', async () => {
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances) 
        const wrapper = mount(Leiloeiro, {
            propsData: {
                id: 1
            }
        })

        await flushPromises()

        const menorLance = wrapper.find('.menor-lance')

        expect(menorLance.element.textContent).toContain('Menor lance: R$ 1001')
    })
})
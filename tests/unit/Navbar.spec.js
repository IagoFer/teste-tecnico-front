// tests/unit/Navbar.spec.js
import { shallowMount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import { createStore } from 'vuex';

// Mock do router-link
const routerLinkMock = {
  template: '<div><slot></slot></div>'
};

describe('Navbar.vue', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        auth: {
          namespaced: true,
          state: () => ({
            isAuthenticated: false,
          }),
          getters: {
            isAuthenticated: state => state.isAuthenticated,
          },
          mutations: {
            auth_success(state) {
              state.isAuthenticated = true;
            },
            logout_success(state) {
              state.isAuthenticated = false;
            }
          },
          actions: {
            logout: jest.fn(),
          },
        },
      },
    });
  });

  it('shows login/register links when not authenticated', () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': routerLinkMock,
        },
      },
    });

    expect(wrapper.text()).toContain('Entrar');
    expect(wrapper.text()).toContain('Registrar');
    expect(wrapper.text()).not.toContain('Painel');
    expect(wrapper.text()).not.toContain('Sair');
  });

  it('shows painel/sair links when authenticated', async () => {
    await store.commit('auth/auth_success');

    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': routerLinkMock,
        },
      },
    });

    expect(wrapper.text()).toContain('Painel');
    expect(wrapper.text()).toContain('Sair');
    expect(wrapper.text()).not.toContain('Entrar');
    expect(wrapper.text()).not.toContain('Registrar');
  });

  it('calls logout action when "Sair" is clicked', async () => {
    await store.commit('auth/auth_success');

    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': routerLinkMock,
        },
      },
    });

    const logoutButton = wrapper.find('button.logout');
    await logoutButton.trigger('click');

    expect(store._modules.root._children.auth.context.dispatch).toHaveBeenCalledWith('logout');
  });

  it('hides painel/sair links when logout is called', async () => {
    await store.commit('auth/auth_success');

    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
        stubs: {
          'router-link': routerLinkMock,
        },
      },
    });

    await store.commit('auth/logout_success');

    expect(wrapper.text()).toContain('Entrar');
    expect(wrapper.text()).toContain('Registrar');
    expect(wrapper.text()).not.toContain('Painel');
    expect(wrapper.text()).not.toContain('Sair');
  });
});

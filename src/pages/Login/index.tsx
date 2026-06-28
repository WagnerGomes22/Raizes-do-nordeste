import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppState } from '@/contexts/useAppState'

type ModoAuth = 'login' | 'cadastro'

export default function LoginPage() {
  const navigate = useNavigate()
  const { state, login, register } = useAppState()
  const [modo, setModo] = useState<ModoAuth>('login')
  const [erro, setErro] = useState('')
  const [loginForm, setLoginForm] = useState({
    email: '',
    senha: '',
  })
  const [cadastroForm, setCadastroForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: '',
    aceitouLgpd: false,
  })

  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!loginForm.email || !loginForm.senha) {
      setErro('Preencha email e senha para continuar.')
      return
    }

    login(loginForm.email)
    setErro('')
    navigate('/')
  }

  function handleCadastroSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !cadastroForm.nome ||
      !cadastroForm.email ||
      !cadastroForm.telefone ||
      !cadastroForm.endereco ||
      !cadastroForm.senha
    ) {
      setErro('Preencha todos os campos do cadastro.')
      return
    }

    if (cadastroForm.senha !== cadastroForm.confirmarSenha) {
      setErro('As senhas precisam ser iguais.')
      return
    }

    if (!cadastroForm.aceitouLgpd) {
      setErro('Voce precisa aceitar os termos LGPD para seguir.')
      return
    }

    register({
      nome: cadastroForm.nome,
      email: cadastroForm.email,
      telefone: cadastroForm.telefone,
      endereco: cadastroForm.endereco,
      aceitouLgpd: cadastroForm.aceitouLgpd,
    })
    setErro('')
    navigate('/')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4">
        <div className="text-xs text-slate-500">
          <Link to="/" className="text-amber-700 hover:underline">
            Home
          </Link>{' '}
          <span className="text-slate-400">/</span> Login e Cadastro
        </div>
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            Etapa 1 do fluxo visual
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Acesse sua conta para continuar o pedido
          </h1>
          <p className="max-w-xl text-sm text-slate-600 sm:text-base">
            Este fluxo simula autenticacao no front-end com validacoes locais e
            persistencia em `LocalStorage`.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-medium text-slate-900">Fluxo atual</div>
            <div className="mt-2 text-sm text-slate-600">
              {state.usuarioLogadoId
                ? `Usuario ativo: ${state.perfil.nome || state.perfil.email}`
                : 'Nenhum usuario autenticado.'}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-medium text-slate-900">LGPD</div>
            <div className="mt-2 text-sm text-slate-600">
              O aceite e armazenado apenas para demonstracao visual do fluxo.
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setModo('login')
              setErro('')
            }}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              modo === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setModo('cadastro')
              setErro('')
            }}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              modo === 'cadastro' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Cadastro
          </button>
        </div>

        {erro ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {erro}
          </div>
        ) : null}

        {modo === 'login' ? (
          <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
            <div className="space-y-2">
              <label htmlFor="login-email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                placeholder="voce@exemplo.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="login-senha" className="text-sm font-medium text-slate-700">
                Senha
              </label>
              <input
                id="login-senha"
                type="password"
                value={loginForm.senha}
                onChange={(event) =>
                  setLoginForm((prev) => ({ ...prev, senha: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-amber-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              Entrar
            </button>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleCadastroSubmit}>
            <div className="space-y-2">
              <label htmlFor="cadastro-nome" className="text-sm font-medium text-slate-700">
                Nome
              </label>
              <input
                id="cadastro-nome"
                value={cadastroForm.nome}
                onChange={(event) =>
                  setCadastroForm((prev) => ({ ...prev, nome: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="cadastro-email" className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="cadastro-email"
                type="email"
                value={cadastroForm.email}
                onChange={(event) =>
                  setCadastroForm((prev) => ({ ...prev, email: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                placeholder="voce@exemplo.com"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="cadastro-senha"
                  className="text-sm font-medium text-slate-700"
                >
                  Senha
                </label>
                <input
                  id="cadastro-senha"
                  type="password"
                  value={cadastroForm.senha}
                  onChange={(event) =>
                    setCadastroForm((prev) => ({ ...prev, senha: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                  placeholder="Crie uma senha"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cadastro-confirmar"
                  className="text-sm font-medium text-slate-700"
                >
                  Confirmar senha
                </label>
                <input
                  id="cadastro-confirmar"
                  type="password"
                  value={cadastroForm.confirmarSenha}
                  onChange={(event) =>
                    setCadastroForm((prev) => ({
                      ...prev,
                      confirmarSenha: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                  placeholder="Repita a senha"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="cadastro-telefone"
                  className="text-sm font-medium text-slate-700"
                >
                  Telefone
                </label>
                <input
                  id="cadastro-telefone"
                  value={cadastroForm.telefone}
                  onChange={(event) =>
                    setCadastroForm((prev) => ({ ...prev, telefone: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                  placeholder="(00) 90000-0000"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cadastro-endereco"
                  className="text-sm font-medium text-slate-700"
                >
                  Endereco
                </label>
                <input
                  id="cadastro-endereco"
                  value={cadastroForm.endereco}
                  onChange={(event) =>
                    setCadastroForm((prev) => ({ ...prev, endereco: event.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-amber-500"
                  placeholder="Rua, numero e bairro"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={cadastroForm.aceitouLgpd}
                onChange={(event) =>
                  setCadastroForm((prev) => ({
                    ...prev,
                    aceitouLgpd: event.target.checked,
                  }))
                }
                className="mt-1 size-4 rounded border-slate-300"
              />
              <span>
                Li e concordo com o tratamento dos meus dados para fins de acesso,
                comunicacao e simulacao do pedido.
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-amber-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-700"
            >
              Criar conta
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

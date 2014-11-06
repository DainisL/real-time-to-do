use Mix.Config

config :phoenix, RealTimeToDo.Router,
  http: [port: System.get_env("PORT") || 3000],
  debug_errors: true

# Enables code reloading for development
config :phoenix, :code_reloader, true

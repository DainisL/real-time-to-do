# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the router
config :phoenix, RealTimeToDo.Router,
  url: [host: "localhost"],
  http: [port: System.get_env("PORT")],
  secret_key_base: "rNqGstlcvHMQLrRZIkaXk0kOKGTnXPn+PirSII0J31iwF+HRe+GLAsVbvXy31YZua/7ejt8C+D3J6c3OyLGkqw==",
  catch_errors: true,
  debug_errors: false,
  error_controller: RealTimeToDo.PageController

# Session configuration
config :phoenix, RealTimeToDo.Router,
  session: [store: :cookie,
            key: "_real_time_to_do_key"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

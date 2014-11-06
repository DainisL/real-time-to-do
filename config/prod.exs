use Mix.Config

# ## SSL Support
#
# To get SSL working, you will need to set:
#
#     https: [port: 443,
#             keyfile: System.get_env("SOME_APP_SSL_KEY_PATH"),
#             certfile: System.get_env("SOME_APP_SSL_CERT_PATH")]
#
# Where those two env variables point to a file on
# disk for the key and cert.

config :phoenix, RealTimeToDo.Router,
  url: [host: "example.com"],
  http: [port: System.get_env("PORT")],
  secret_key_base: "rNqGstlcvHMQLrRZIkaXk0kOKGTnXPn+PirSII0J31iwF+HRe+GLAsVbvXy31YZua/7ejt8C+D3J6c3OyLGkqw=="

config :logger,
  level: :info

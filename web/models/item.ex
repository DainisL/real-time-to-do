defmodule Item do
  use Ecto.Model

  schema "items" do
    field :description, :string
    field :position, :integer
    field :done, :boolean
    field :updated_at, :datetime
  end
  
  validate item, description: present()
end
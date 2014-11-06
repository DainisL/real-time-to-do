defmodule RealTimeToDo.ToDoChannel do
  use Phoenix.Channel
  alias RealTimeToDo.Repo

  def join(socket, "list", message) do
    {:ok, socket}
  end

  defp atomize_keys(struct) do
    Enum.reduce struct, %{}, fn({k, v}, map) -> Map.put(map, String.to_atom(k), v) end
  end

  def event(socket, "create:item", %{"item" => params}) do
    item = create_item(params)
    
    if item do
      item_html = Phoenix.View.render RealTimeToDo.ToDosView, "item.html", item: item
      html = elem(item_html, 1)
      broadcast socket, "create:item", %{item_html: html}
    end
    socket
  end

  defp create_item(params) do
    item = Map.merge(%Item{done: false}, atomize_keys(params))

    case Item.validate(item) do
      [] ->
        item = Repo.insert(item)
      errors ->
        nil
    end
  end

  def event(socket, "delete:item", data) do
    item = delete_item(data["item_id"])
    broadcast socket, "delete:item", %{item: item}
    socket
  end

  def delete_item(item_id) do
    case Repo.get(Item, String.to_integer(item_id)) do
      item when is_map(item) ->
        Repo.delete(item)
        item
      _ ->
        nil
    end
  end

  def event(socket, "toggle:item", data) do
    item = toggleitemdonestatus(data["item_id"])
    IO.puts(inspect item) 
    if item, do: broadcast(socket, "toggle:item", %{item: item})
    socket
  end

  defp toggleitemdonestatus(item_id) do
    case Repo.get(Item, String.to_integer(item_id)) do
      item when is_map(item) ->
        item = %{item | done: !item.done}
        Repo.update(item)
        item
      ->
        nil
    end
    item
  end

  def event(socket, "update:item", %{"item_id" => item_id, "item" => params}) do
    item = update_item(item_id, params)
    if item, do: broadcast(socket, "update:item", %{item: item})
    socket
  end

  defp update_item(item_id, params) do
    case Repo.get(Item, String.to_integer(item_id)) do
      item when is_map(item) ->
        atomized_keys_params = atomize_keys(params)
        item = Map.merge(item, atomized_keys_params)
        case Item.validate(item) do
          [] ->
            Repo.update(item)
            item
          _ ->
            nil
        end
      _ ->
        nil
    end
  end

  # def event(socket, "arrange:items", data) do
  #   update_positions(data["item_ids"])
  #   broadcast(socket, "arrange:items", %{item_ids: data["item_ids"], for_list: data["for_list"]})
  #   socket
  # end

  # defp update_positions(item_ids) do
  #   item_ids = String.split(item_ids, ",")
  #                     |> Enum.map fn item_id -> String.to_integer(item_id) end

    # items = Repo.all(Item |> where([item], item.id in array(^item_ids, :integer)))
  #   item_hash = Enum.reduce items, %{}, fn item, map -> Map.put(map, item.id, item) end

  #   item_ids
  #     |> Stream.with_index
  #     |> Enum.each fn {item_id, index} ->
  #       item = item_hash[item_id]
  #       Repo.update(%{item | position: index + 1})
  #     end
  # end
end
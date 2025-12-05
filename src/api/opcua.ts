const API = "http://localhost:8000/opcua";

export async function opcuaConnect(id: number) {
  const res = await fetch(`${API}/connect/${id}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function opcuaDisconnect(id: number) {
  const res = await fetch(`${API}/disconnect/${id}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function startSubscription(tagId: number) {
  const res = await fetch(`${API}/start-subscription/${tagId}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function stopSubscription(tagId: number) {
  const res = await fetch(`${API}/stop-subscription/${tagId}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getStatus(tagId: number) {
  const res = await fetch(`${API}/status/${tagId}`);

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getActiveTags() {
  const res = await fetch(`${API}/active-tags`);

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

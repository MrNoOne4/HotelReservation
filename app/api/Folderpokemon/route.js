import { NextResponse } from 'next/server';

// Fake database (in-memory)
let pokemons = [
  { id: 1, name: 'Pikachu', type: 'Electric' },
  { id: 2, name: 'Charmander', type: 'Fire' }
];

// GET /api/pokemon
// GET /api/pokemon?type=Fire
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let result = pokemons;

  if (type) {
    result = pokemons.filter(p => p.type === type);
  }

  return NextResponse.json(result);
}

// POST /api/pokemon
export async function POST(request) {
  const body = await request.json();

  if (!body.name || !body.type) {
    return NextResponse.json(
      { error: 'Name and type are required' },
      { status: 400 }
    );
  }

  const newPokemon = {
    id: Date.now(),
    name: body.name,
    type: body.type
  };

  pokemons.push(newPokemon);

  return NextResponse.json(newPokemon, { status: 201 });
}

import { redirect } from 'next/navigation';

/**
 * Rota raiz redireciona para a aba de Status do personagem.
 */
export default function Home() {
  redirect('/personagem/status');
}

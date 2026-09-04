# Atualização WhatsApp, modal e tracking

- [x] Definir o destino do botão flutuante do WhatsApp sem inventar um número de telefone.
- [x] Adicionar botão flutuante acessível no canto inferior direito.
- [x] Implementar scroll suave e fade-in progressivo nos elementos visuais.
- [x] Respeitar `prefers-reduced-motion` e validar desktop/mobile.
- [x] Criar checkpoint da atualização.
- [x] Criar modal de contacto no CTA final.
- [x] Validar campos e estado de sucesso do formulário.
- [x] Configurar o WhatsApp com o número oficial e mensagem personalizada.
- [x] Instrumentar cliques no WhatsApp e nos CTAs.
- [x] Validar desktop/mobile e criar checkpoint.

## Atualização do formulário

- [x] Adicionar consentimento de privacidade obrigatório.
- [x] Adicionar campo de assunto com opções de contacto.
- [x] Mostrar toast de sucesso após o envio.
- [x] Validar o fluxo e criar checkpoint.

## Estado de envio

- [x] Adicionar loading state ao botão do formulário.
- [x] Bloquear submissões repetidas e validar a animação.
- [x] Criar checkpoint da atualização.

## Resiliência do formulário

- [x] Persistir automaticamente os campos do formulário no local storage.
- [x] Restaurar dados guardados quando o modal for reaberto.
- [x] Sugerir mensagens contextuais com base no assunto escolhido.
- [x] Mostrar erro visual e toast se o WhatsApp não abrir.
- [x] Validar a atualização e criar checkpoint.

## Secção Evolução

- [x] Copiar e alojar as três imagens reais fornecidas.
- [x] Criar a secção “Evolução” com galeria de casos individuais.
- [x] Implementar comparação antes/depois com slider mouse e touch.
- [x] Adicionar navegação, indicadores, labels e CTA para WhatsApp.
- [x] Validar desktop/mobile e criar checkpoint.

## Animação automática do comparador

- [x] Animar suavemente o divisor quando a secção entra no viewport.
- [x] Parar a demonstração ao primeiro controlo manual.
- [x] Desactivar a animação com prefers-reduced-motion e validar desktop/mobile.
- [x] Criar checkpoint da atualização.

## Verificação da edição da imagem hero

- [x] Confirmar a referência actual do hero em Home.tsx.
- [x] Verificar se existe um asset local fornecido para substituir a imagem.
- [x] Não guardar caminho file:/// local na aplicação publicada.
- [x] Validar a aplicação e criar checkpoint apenas após resolver a referência.

## Substituição da fotografia hero

- [x] Copiar e alojar a foto1.jpeg fornecida.
- [x] Actualizar a referência da imagem principal do hero.
- [x] Validar enquadramento, contraste e responsividade.
- [x] Criar checkpoint da atualização.

## Nova galeria Antes e Depois

- [x] Catalogar as nove fotografias recebidas e identificar os pares antes/depois.
- [x] Alojar os novos assets fora do directório do projecto.
- [x] Actualizar os quatro casos exibidos na galeria.
- [x] Ajustar o comparador para preservar a fotografia completa, sem crop agressivo.
- [x] Validar desktop/mobile e criar checkpoint.

## Substituição da foto do caso 4

- [x] Alojar a foto6.jpeg como asset web.
- [x] Substituir a fotografia actual do caso 4.
- [x] Validar o enquadramento completo em desktop e mobile.
- [x] Criar checkpoint da atualização.

## Verificação de edições de imagem

- [ ] Confirmar as referências actuais dos três elementos no Home.tsx.
- [ ] Verificar se os assets pedidos existem no ambiente.
- [ ] Manter apenas referências /manus-storage válidas.
- [ ] Validar a página e criar checkpoint.

## Verificação da edição visual recente

- [x] Aplicar a foto6 já alojada na imagem da secção Sobre.
- [x] Confirmar os dois assets de Instagram adicionais, ainda não presentes no upload.
- [x] Validar a página sem guardar caminhos file:/// locais.
- [x] Criar checkpoint da resolução parcial.

## Galeria Instagram e CTA social

- [x] Alojar as duas novas imagens da galeria Instagram.
- [x] Substituir os dois placeholders visuais pelos assets recebidos.
- [x] Adicionar hover suave e recorte seguro à foto da secção Sobre.
- [x] Incluir botão “Seguir no Instagram” abaixo da galeria.
- [x] Validar desktop/mobile e criar checkpoint.

## Fotografias de treino e pulso social

- [x] Alojar as duas novas fotografias de treino.
- [x] Substituir os dois placeholders restantes da galeria Instagram.
- [x] Adicionar pulso suave ao botão “Seguir no Instagram”.
- [x] Respeitar prefers-reduced-motion e validar desktop/mobile.
- [x] Criar checkpoint da atualização.

## Revisão dos depoimentos

- [x] Inspeccionar o conteúdo actualmente renderizado nos três cartões.
- [x] Remover qualquer texto inconsistente ou não autorizado.
- [x] Manter placeholders até existirem depoimentos reais confirmados.
- [x] Validar build e criar checkpoint.

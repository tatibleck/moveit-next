/* 
* arquivo principal de html da aplicação 
   * mudanças principais e globais vão aqui
    * seria com o index da pasta public do projeto em React 
     * o Document carrega apenas uma vez a cada "visita" do user 
*/

import Document, { Html, Head, Main, NextScript } from 'next/document';
/* 
* importamos a classe documento do Next e dizemos quais elementos do HTML vamos usar em tags
*/

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="favicon.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
        </Head>

        <body>
          <Main />  {/* onde teremos a parte principal */}
          <NextScript /> {/* Scripts automatizados do Next */}
        </body>
      </Html>
    );
  }
}
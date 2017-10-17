import { PHPProjektPage } from './app.po';

describe('phpprojekt App', () => {
  let page: PHPProjektPage;

  beforeEach(() => {
    page = new PHPProjektPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

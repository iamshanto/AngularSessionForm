import { FormSessionPage } from './app.po';

describe('form-session App', function() {
  let page: FormSessionPage;

  beforeEach(() => {
    page = new FormSessionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

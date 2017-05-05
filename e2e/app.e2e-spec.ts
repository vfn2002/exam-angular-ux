import { NgMandatory2Page } from './app.po';

describe('ng-mandatory2 App', () => {
  let page: NgMandatory2Page;

  beforeEach(() => {
    page = new NgMandatory2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

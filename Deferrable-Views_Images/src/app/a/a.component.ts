import { Component } from '@angular/core';
import { LargeComponent } from '../large/large.component';
import { DeferBlockState, TestBed } from '@angular/core/testing';

it('should render a defer block in different states', async () => {
  @Component({
    selector: 'app-a',
    standalone: true,
    styleUrl: './a.component.scss',
    template: `
      @defer {
      <large-component />
      } @placeholder { Placeholder } @loading { Loading... }
    `,
    imports: [LargeComponent],
  })
  class AComponent {}

  // Create component fixture.
  const componentFixture = TestBed.createComponent(AComponent);

  // Retrieve the list of all defer block fixtures and get the first block.
  const deferBlockFixture = (await componentFixture.getDeferBlocks())[0];

  // Renders placeholder state by default.
  expect(componentFixture.nativeElement.innerHTML).toContain('Placeholder');

  // Render loading state and verify rendered output.
  await deferBlockFixture.render(DeferBlockState.Loading);
  expect(componentFixture.nativeElement.innerHTML).toContain('Loading');

  // Render final state and verify the output.
  await deferBlockFixture.render(DeferBlockState.Complete);
  expect(componentFixture.nativeElement.innerHTML).toContain('large works!');
});

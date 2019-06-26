import NoImage from '../../components/NoImage';

describe('<NoImage>', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount( <NoImage /> );
  });

  it('should have Google icon wrapped in an <a> tag', () => {
    expect(wrapper.find(".noImage").contains(<span>No Image</span>)).toEqual(true);
    expect(wrapper.find("span").text()).toEqual("No Image");
  });
});

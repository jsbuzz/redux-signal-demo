import React from "react";
import { shallow } from "enzyme";
import { UploadMutator, uploadStates, uploadReducer } from "./UploadMutator";
import * as reduxTransitions from "redux-transitions";
import * as reactRedux from "react-redux";
import { uploadChunk, uploadError } from "../../redux/actions";
import { uploadFile } from "../../redux/thunks/uploadFile";

const mockUploadTransition = reduxTransitions.mockTransition(
  uploadStates,
  uploadReducer
);

describe("UploadMutator", () => {
  let dispatched;
  let wrapper;
  let useTransitionsStub;

  beforeEach(() => {
    dispatched = [];
    jest
      .spyOn(reactRedux, "useDispatch")
      .mockImplementation((action) => dispatched.push(action));
    useTransitionsStub = jest.spyOn(reduxTransitions, "useTransitions");
  });

  describe("Base transition state", () => {
    beforeEach(() => {
      useTransitionsStub.mockReturnValue({});
      wrapper = shallow(<UploadMutator />);
    });

    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Pending transition state start", () => {
    beforeEach(() => {
      useTransitionsStub.mockReturnValue(mockUploadTransition(uploadFile));
      wrapper = shallow(<UploadMutator />);
    });

    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Pending transition state with Chunk", () => {
    const chunk = 37;
    beforeEach(() => {
      useTransitionsStub.mockReturnValue(
        mockUploadTransition(uploadChunk(chunk))
      );
      wrapper = shallow(<UploadMutator />);
    });

    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("Error transition state", () => {
    const error = "something went wrong";

    beforeEach(() => {
      useTransitionsStub.mockReturnValue(
        mockUploadTransition(uploadError(error))
      );
      wrapper = shallow(<UploadMutator />);
    });

    it("should match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});

import React from "react";

function TargetHOC(WrappedComponent) {
  return !window.adobe
    ? WrappedComponent
    : class extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            hasTargetOutput: null
          };

          this.getTargetRequest = this.getTargetRequest.bind(this);
          this.targetUpdate = this.targetUpdate.bind(this);
        }
        renderTargetRequest(offers = []) {
          adobe.target.applyOffer({
            mbox: "target-global-mbox",
            offer: (offers || []).map(({ found, ...x }) => ({ ...x }))
          });
        }
        targetUpdate() {
          const { hasTargetOutput } = this.state;
          this.renderTargetRequest(hasTargetOutput);
        }
        getTargetRequest() {
          const { hasTargetOutput } = this.state;
          if (hasTargetOutput === null) {
            const targetRender = this.renderTargetRequest;
            adobe.target.getOffer({
              mbox: "target-global-mbox",
              success: offers => {
                targetRender(offers);

                this.setState({
                  hasTargetOutput: offers && offers.length > 0 ? offers : false
                });
              },
              error: (status, error) => {
                this.setState({
                  hasTargetOutput: false
                });
              }
            });
          } else if (hasTargetOutput) {
            this.targetUpdate();
          }
        }
        componentDidMount() {
          this.getTargetRequest();
        }
        componentDidUpdate(prevProps, prevState) {
          const { hasTargetOutput } = this.state;
          if (hasTargetOutput && prevState.hasTargetOutput) {
            this.targetUpdate();
          }
        }
        render() {
          return (
            <WrappedComponent
              targetUpdate={this.targetUpdate}
              {...this.props}
            />
          );
        }
      };
}

export default TargetHOC;

"use client";

export default function Resume() {
    return (
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto mb-8">
            {/* Embed Google Doc as iframe */}
            <div className="aspect-[8.5/11] w-full">
              <iframe
                src="https://docs.google.com/document/d/e/2PACX-1vS-c508GHpue5lroiW6jVEWJZ_cprsLB7nCVB2mxd13X3tBtAFXEO9-6HNS1Vrkz7Y8n_pH95DsW9iS/pub?embedded=true"
                className="w-full h-full border-0 rounded-lg shadow-lg"
                title="My Resume"
              ></iframe>
            </div>
          </div>
        </div>
    )
}
# Building Custom Connectors in Go

OpenFlow is fully extensible. You can implement custom connectors in Golang and register them into the engine with just a few lines of code.

---

## 1. Implement the `Connector` Interface

```go
package custom

import (
    "context"
    "fmt"
    "openflow/pkg/connectors"
    "openflow/pkg/model"
)

type S3StorageConnector struct{}

func NewS3StorageConnector() *S3StorageConnector {
    return &S3StorageConnector{}
}

func (c *S3StorageConnector) Type() model.ConnectorType {
    return "aws_s3"
}

func (c *S3StorageConnector) Descriptor() model.ConnectorDescriptor {
    return model.ConnectorDescriptor{
        Type:        "aws_s3",
        Name:        "AWS S3 Bucket Storage",
        Description: "Uploads and retrieves objects from Amazon S3 buckets",
        Category:    "cloud_storage",
        Icon:        "Cloud",
        Version:     "1.0.0",
    }
}

func (c *S3StorageConnector) Validate(config map[string]interface{}) error {
    if _, ok := config["bucket"].(string); !ok {
        return fmt.Errorf("aws_s3 connector requires 'bucket' in config")
    }
    return nil
}

func (c *S3StorageConnector) Execute(
    ctx context.Context,
    execCtx *connectors.ExecutionContext,
    config map[string]interface{},
    input map[string]interface{},
) (map[string]interface{}, error) {
    bucket := config["bucket"].(string)
    key := config["key"].(string)

    // Perform your custom business logic / SDK calls here
    log.Printf("Uploading payload to S3 -> s3://%s/%s", bucket, key)

    return map[string]interface{}{
        "s3_uri": fmt.Sprintf("s3://%s/%s", bucket, key),
        "status": "UPLOADED",
    }, nil
}
```

---

## 2. Register with OpenFlow Engine

In your `main.go` entrypoint:

```go
registry := connectors.NewRegistry()

// Register standard connectors
registry.Register(connHTTP.NewHTTPConnector())
registry.Register(connKafka.NewKafkaConnector(...))

// Register your custom connector!
registry.Register(custom.NewS3StorageConnector())

engine := engine.NewEngine(store, registry)
```

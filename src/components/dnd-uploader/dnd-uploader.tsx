import { Fragment, useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Grid, Row, Spacer, Text } from '@nextui-org/react';
import { useDropzone } from 'react-dropzone';
import { Delete } from 'react-iconly';
import { useMediaQuery } from '@hooks';
import { StyledCard } from './dnd-uploader.styles';
import type { FC } from 'react';

export const DndUploader: FC<DndUploaderProps> = (props: DndUploaderProps) => {
  const { onChange } = props;

  const isMobile = useMediaQuery(650);
  const [files, setFiles] = useState<File[] | undefined>(undefined);

  useEffect(() => {
    onChange(files);
  }, [onChange, files]);

  const onDropHandler = useCallback((acceptedFiles: File[]) => {
    if (Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
      setFiles((prev: File[] | undefined) => {
        if (!prev) return [...acceptedFiles];
        return [...prev, ...acceptedFiles];
      });
    }
  }, []);

  const { getRootProps, fileRejections, open, isDragActive } = useDropzone({
    onDrop: onDropHandler,
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': ['.jpeg', '.png']
    }
  });

  const deleteHandler = (index: number) => {
    setFiles((prev: File[] | undefined) => {
      if (!prev) return;
      return prev?.filter((_, i) => i !== index);
    });
  };

  return (
    <Fragment>
      <StyledCard isDragActive={isDragActive} css={{ $$cardColor: 'transparent' }} {...getRootProps({ className: 'dropzone' })}>
        <Card.Body css={{ dflex: 'center' }}>
          {isDragActive ? (
            <Text css={{ color: '$accents6' }}>Drop the files here ...</Text>
          ) : (
            <Text css={{ color: '$accents6' }}>Drag drop some files here or click to select files</Text>
          )}

          {fileRejections && fileRejections.length !== 0 && <Text color="warning">Only image files will be accepted</Text>}
          <Spacer x={2} />
          <Button type="button" color="secondary" disabled={isDragActive} auto flat onClick={() => open()}>
            Select Files
          </Button>
          {files && files?.length !== 0 && (
            <Fragment>
              <Spacer x={2} />
              <Grid.Container css={{ p: '0' }} gap={2} justify="flex-start">
                {files.map((file: File, index: number) => (
                  <Grid key={`${file.name}-${index}`} xs={6} sm={4} md={3}>
                    <Card cover>
                      <Card.Body>
                        <Card.Image width="100%" height={240} src={URL.createObjectURL(file)} alt={file.name} />
                      </Card.Body>
                      <Card.Footer
                        blur
                        css={{
                          position: 'absolute',
                          bgBlur: '#808080',
                          borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.1)',
                          bottom: 0,
                          zIndex: 1
                        }}
                      >
                        <Row justify="space-between" align="center">
                          {!isMobile && (
                            <Col css={{ flex: 1, minWidth: 110, '@xsMax': { minWidth: 30 } }}>
                              <Text
                                css={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                size={12}
                                weight="bold"
                                transform="uppercase"
                              >
                                {file.name}
                              </Text>
                              <Text
                                css={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                size={12}
                                transform="uppercase"
                              >
                                {`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                              </Text>
                            </Col>
                          )}
                          <Col>
                            <Row justify="flex-end">
                              <Button
                                color="error"
                                auto
                                flat
                                rounded
                                ripple={false}
                                size={isMobile ? 'sm' : 'md'}
                                icon={!isMobile ? <Delete primaryColor="currentColor" set="curved" /> : undefined}
                                onClick={() => deleteHandler(index)}
                              >
                                Delete
                              </Button>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
              </Grid.Container>
            </Fragment>
          )}
        </Card.Body>
      </StyledCard>
    </Fragment>
  );
};

interface DndUploaderProps {
  onChange: (files: File[] | undefined) => void;
}

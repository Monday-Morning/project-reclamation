module.exports = {
  apps: [
    {
      name: 'MM API Server',
      script: './app.js',
      watch: false,
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        SESSION_SECRET: 'development-session-secret',
        SESSION_KEY: 'development-session-key',
        MONGO_SESSION_URL:
          'mongodb+srv://devDbSession:QojwowKSQWbBA4AY@infinity.j8emp.gcp.mongodb.net/dev-session?retryWrites=true&w=majority',
        MONGO_APP_URL:
          'mongodb+srv://devDbUser:9JQlaKivfZAwGQic@infinity.j8emp.gcp.mongodb.net/dev?retryWrites=true&w=majority',
        FIREBASE_PROJECT_ID: 'project-infinity-98561',
        FIREBASE_KEY_ID: '5421e25bcc41b14b6b333e7bc1965bc0a6036fe4',
        FIREBASE_PRIVATE_KEY:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5/FHjZo3Z4CIp\nZOQK+Gvafhl+a9FXItz/5rBj+fB6nV2sF8jyc+uWdPBUHtLkZYQPw61SoSivm7ji\nJeZXgQPhgXjhD/Nar0zNV8sxUStgG/+5YCxTy7BrRHkhnyYyZRI1rpAc+3iDvMrY\nG6iWRNp5VNZm1AXhwlqYuxFH38EFSCRWAu2ubvlVpRxffnZgMgqIj+/P9brqvu06\nchXaVC3PIE+YucAdss550XV3+MXdmksx02JMYhrK3uEn0C7oGhoE0SjyvLIlODX9\nR4/jbm4b9HGphmjxh4I9byjcFccfhemmpVbNo+9HEjZAxTANXzmqBF3D3BchAbmJ\nTCCulHvJAgMBAAECggEAASsLKiAZpbvNRyCHuKRrDAAlAZjkg5U32WEd7EDUgHam\n0RcEp3YwLX2eSU74wN+82rr+RpG1z1WNbZkyl0vbhgHxzAsVOpV1iGgj4fNKMBQ4\n8NWAbcXOnbvcPWhyHViqar0mEVKIhR5NUVpqHoh/7Ulpv9NW1p5JgqJRJ1gJzrJM\nr2krWgR6U7bxpyKhNz0OI/OXk1GLHHKjR4I7ok66g73uXHzfe3e5GL32Yyailo/T\nAIK13jdFrq+ESGnzQPyFFlhevUTe8HrASa8cVdhGsSNiIe7teotGMV2aKBZeS88l\nLuzQHmshYOLzquJoMxQNfMGyIxVM44IG7FKrOOTjIQKBgQDbnkeklGXge5Quk+NX\nuH0eIdsA4nt9xQcq4ujKfO1tRJZ+FcLvkF0sSvQYC7dgknvz9DO2NeKZ3A15aNZ0\n2YkuEzKcfYAe+h+OHoLx+ElTtnd47GFVeRb/IGnrT4nM1gii9Mtz1xot27rmKsyE\nTMi6qEiNtGb1xk9cDyEC0N5rqQKBgQDYy7lBrYmy+DdqSV666wRfOE50TvfVcl7q\ncVasl969I5DUIKHI9HJHowzcnSPwU6WR4dXa7v8PxMq9OeTdn7Fy/EvbltRtoosA\nYR/fU3s3hlNeEjvA2YkqA2px5/RM5IprRFEdC/653jEbylxwDnuOmIOsIEnYoWpX\nqYh0gfyjIQKBgQCBCggYWKVfd90CXRyoTxsc2FGgvHJI3LqwZTDYwPyURkeSf+DQ\n9+b2/ndbpY6yrH8uQN8dgZ3KP3SfUI0pjSPAMcF8F3VvPhHKZH0WBYe4Ky8ZmvI5\n0XNEplv1yf8yntPmQ6VDRDD6nu+7C4ytc5xBqF0w/b29TS8V7UG9MNJvOQKBgCLH\nvDbPMnIl5C4HC02NeqwUCnIaYSQ7LwMJn9AcpT1OwWNmwM3Oea8Id33FMAjUQpG+\n22I+SWksNyJYcWEkx4Ec/MaD0hysoQQ0kLpxWCk2QZWr8y4jOCAnYCJaBhV37MT8\nts6kJ/+Fp/c/ZckMacIcsbMhkvdQHhFmP2ABophBAoGAMAUuVjceZ6gg99UPyzk9\nIPlQ4R2EwYd1b6xKD/m3j7huYfDRsWOTdDxCgWERqjAljGdvgcGJXIUiJm7ZBVlp\nGM1JFo8LeGYI2wtZxQfW4lrfC5J0r7MquDVfatYmb1vb3rdx0iD6MeQrF46Hroip\n4qv5uGBq3fjMoEYi5XJvb2A=\n-----END PRIVATE KEY-----\n',
        FIREBASE_CLIENT_EMAIL: 'firebase-adminsdk-sh2v3@project-infinity-98561.iam.gserviceaccount.com',
        FIREBASE_CLIENT_ID: '108291925916331686796',
        FIREBASE_AUTH_URI: 'https://accounts.google.com/o/oauth2/auth',
        FIREBASE_TOKEN_URI: 'https://oauth2.googleapis.com/token',
        FIREBASE_AUTH_PROVIDER_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
        FIREBASE_CLIENT_CERT_URL:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sh2v3%40project-infinity-98561.iam.gserviceaccount.com',
        GCP_STORAGE_BUCKET: 'development.project-infinity-98561.appspot.com',
        TEST_AUTH_KEY: 'some-sample-jwt-token',
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 80,
        SESSION_SECRET: 'staging-session-secret',
        SESSION_KEY: 'staging-session-key',
        MONGO_SESSION_URL:
          'mongodb+srv://devDbSession:QojwowKSQWbBA4AY@infinity.j8emp.gcp.mongodb.net/dev-session?retryWrites=true&w=majority',
        MONGO_APP_URL:
          'mongodb+srv://devDbUser:9JQlaKivfZAwGQic@infinity.j8emp.gcp.mongodb.net/dev?retryWrites=true&w=majority',
        FIREBASE_PROJECT_ID: 'project-infinity-98561',
        FIREBASE_KEY_ID: '5421e25bcc41b14b6b333e7bc1965bc0a6036fe4',
        FIREBASE_PRIVATE_KEY:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5/FHjZo3Z4CIp\nZOQK+Gvafhl+a9FXItz/5rBj+fB6nV2sF8jyc+uWdPBUHtLkZYQPw61SoSivm7ji\nJeZXgQPhgXjhD/Nar0zNV8sxUStgG/+5YCxTy7BrRHkhnyYyZRI1rpAc+3iDvMrY\nG6iWRNp5VNZm1AXhwlqYuxFH38EFSCRWAu2ubvlVpRxffnZgMgqIj+/P9brqvu06\nchXaVC3PIE+YucAdss550XV3+MXdmksx02JMYhrK3uEn0C7oGhoE0SjyvLIlODX9\nR4/jbm4b9HGphmjxh4I9byjcFccfhemmpVbNo+9HEjZAxTANXzmqBF3D3BchAbmJ\nTCCulHvJAgMBAAECggEAASsLKiAZpbvNRyCHuKRrDAAlAZjkg5U32WEd7EDUgHam\n0RcEp3YwLX2eSU74wN+82rr+RpG1z1WNbZkyl0vbhgHxzAsVOpV1iGgj4fNKMBQ4\n8NWAbcXOnbvcPWhyHViqar0mEVKIhR5NUVpqHoh/7Ulpv9NW1p5JgqJRJ1gJzrJM\nr2krWgR6U7bxpyKhNz0OI/OXk1GLHHKjR4I7ok66g73uXHzfe3e5GL32Yyailo/T\nAIK13jdFrq+ESGnzQPyFFlhevUTe8HrASa8cVdhGsSNiIe7teotGMV2aKBZeS88l\nLuzQHmshYOLzquJoMxQNfMGyIxVM44IG7FKrOOTjIQKBgQDbnkeklGXge5Quk+NX\nuH0eIdsA4nt9xQcq4ujKfO1tRJZ+FcLvkF0sSvQYC7dgknvz9DO2NeKZ3A15aNZ0\n2YkuEzKcfYAe+h+OHoLx+ElTtnd47GFVeRb/IGnrT4nM1gii9Mtz1xot27rmKsyE\nTMi6qEiNtGb1xk9cDyEC0N5rqQKBgQDYy7lBrYmy+DdqSV666wRfOE50TvfVcl7q\ncVasl969I5DUIKHI9HJHowzcnSPwU6WR4dXa7v8PxMq9OeTdn7Fy/EvbltRtoosA\nYR/fU3s3hlNeEjvA2YkqA2px5/RM5IprRFEdC/653jEbylxwDnuOmIOsIEnYoWpX\nqYh0gfyjIQKBgQCBCggYWKVfd90CXRyoTxsc2FGgvHJI3LqwZTDYwPyURkeSf+DQ\n9+b2/ndbpY6yrH8uQN8dgZ3KP3SfUI0pjSPAMcF8F3VvPhHKZH0WBYe4Ky8ZmvI5\n0XNEplv1yf8yntPmQ6VDRDD6nu+7C4ytc5xBqF0w/b29TS8V7UG9MNJvOQKBgCLH\nvDbPMnIl5C4HC02NeqwUCnIaYSQ7LwMJn9AcpT1OwWNmwM3Oea8Id33FMAjUQpG+\n22I+SWksNyJYcWEkx4Ec/MaD0hysoQQ0kLpxWCk2QZWr8y4jOCAnYCJaBhV37MT8\nts6kJ/+Fp/c/ZckMacIcsbMhkvdQHhFmP2ABophBAoGAMAUuVjceZ6gg99UPyzk9\nIPlQ4R2EwYd1b6xKD/m3j7huYfDRsWOTdDxCgWERqjAljGdvgcGJXIUiJm7ZBVlp\nGM1JFo8LeGYI2wtZxQfW4lrfC5J0r7MquDVfatYmb1vb3rdx0iD6MeQrF46Hroip\n4qv5uGBq3fjMoEYi5XJvb2A=\n-----END PRIVATE KEY-----\n',
        FIREBASE_CLIENT_EMAIL: 'firebase-adminsdk-sh2v3@project-infinity-98561.iam.gserviceaccount.com',
        FIREBASE_CLIENT_ID: '108291925916331686796',
        FIREBASE_AUTH_URI: 'https://accounts.google.com/o/oauth2/auth',
        FIREBASE_TOKEN_URI: 'https://oauth2.googleapis.com/token',
        FIREBASE_AUTH_PROVIDER_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
        FIREBASE_CLIENT_CERT_URL:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sh2v3%40project-infinity-98561.iam.gserviceaccount.com',
        GCP_STORAGE_BUCKET: 'staging.project-infinity-98561.appspot.com',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 80,
        SESSION_SECRET:
          'DD2EFFB5494BAC8A565EC637BE22EC12353656E374977008DB682E5BF81BA0B49968A2A5C299E61EB0B2BCE22E12E4B9B39B7B73C55EC3717DB21AFF4A6ED510',
        SESSION_KEY:
          'C054FF8874BF32D48B78EA97D519F0CA7754D9793E1E5E79DFBD4987043F93B291296E160CB5AD9E5A9A39884844F3BF535DFEF8D0FEF3F2FBA7B06D23D4C201',
        MONGO_SESSION_URL:
          'mongodb+srv://devDbSession:QojwowKSQWbBA4AY@infinity.j8emp.gcp.mongodb.net/dev-session?retryWrites=true&w=majority',
        MONGO_APP_URL:
          'mongodb+srv://devDbUser:9JQlaKivfZAwGQic@infinity.j8emp.gcp.mongodb.net/dev?retryWrites=true&w=majority',
        FIREBASE_PROJECT_ID: 'project-infinity-98561',
        FIREBASE_KEY_ID: '5421e25bcc41b14b6b333e7bc1965bc0a6036fe4',
        FIREBASE_PRIVATE_KEY:
          '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5/FHjZo3Z4CIp\nZOQK+Gvafhl+a9FXItz/5rBj+fB6nV2sF8jyc+uWdPBUHtLkZYQPw61SoSivm7ji\nJeZXgQPhgXjhD/Nar0zNV8sxUStgG/+5YCxTy7BrRHkhnyYyZRI1rpAc+3iDvMrY\nG6iWRNp5VNZm1AXhwlqYuxFH38EFSCRWAu2ubvlVpRxffnZgMgqIj+/P9brqvu06\nchXaVC3PIE+YucAdss550XV3+MXdmksx02JMYhrK3uEn0C7oGhoE0SjyvLIlODX9\nR4/jbm4b9HGphmjxh4I9byjcFccfhemmpVbNo+9HEjZAxTANXzmqBF3D3BchAbmJ\nTCCulHvJAgMBAAECggEAASsLKiAZpbvNRyCHuKRrDAAlAZjkg5U32WEd7EDUgHam\n0RcEp3YwLX2eSU74wN+82rr+RpG1z1WNbZkyl0vbhgHxzAsVOpV1iGgj4fNKMBQ4\n8NWAbcXOnbvcPWhyHViqar0mEVKIhR5NUVpqHoh/7Ulpv9NW1p5JgqJRJ1gJzrJM\nr2krWgR6U7bxpyKhNz0OI/OXk1GLHHKjR4I7ok66g73uXHzfe3e5GL32Yyailo/T\nAIK13jdFrq+ESGnzQPyFFlhevUTe8HrASa8cVdhGsSNiIe7teotGMV2aKBZeS88l\nLuzQHmshYOLzquJoMxQNfMGyIxVM44IG7FKrOOTjIQKBgQDbnkeklGXge5Quk+NX\nuH0eIdsA4nt9xQcq4ujKfO1tRJZ+FcLvkF0sSvQYC7dgknvz9DO2NeKZ3A15aNZ0\n2YkuEzKcfYAe+h+OHoLx+ElTtnd47GFVeRb/IGnrT4nM1gii9Mtz1xot27rmKsyE\nTMi6qEiNtGb1xk9cDyEC0N5rqQKBgQDYy7lBrYmy+DdqSV666wRfOE50TvfVcl7q\ncVasl969I5DUIKHI9HJHowzcnSPwU6WR4dXa7v8PxMq9OeTdn7Fy/EvbltRtoosA\nYR/fU3s3hlNeEjvA2YkqA2px5/RM5IprRFEdC/653jEbylxwDnuOmIOsIEnYoWpX\nqYh0gfyjIQKBgQCBCggYWKVfd90CXRyoTxsc2FGgvHJI3LqwZTDYwPyURkeSf+DQ\n9+b2/ndbpY6yrH8uQN8dgZ3KP3SfUI0pjSPAMcF8F3VvPhHKZH0WBYe4Ky8ZmvI5\n0XNEplv1yf8yntPmQ6VDRDD6nu+7C4ytc5xBqF0w/b29TS8V7UG9MNJvOQKBgCLH\nvDbPMnIl5C4HC02NeqwUCnIaYSQ7LwMJn9AcpT1OwWNmwM3Oea8Id33FMAjUQpG+\n22I+SWksNyJYcWEkx4Ec/MaD0hysoQQ0kLpxWCk2QZWr8y4jOCAnYCJaBhV37MT8\nts6kJ/+Fp/c/ZckMacIcsbMhkvdQHhFmP2ABophBAoGAMAUuVjceZ6gg99UPyzk9\nIPlQ4R2EwYd1b6xKD/m3j7huYfDRsWOTdDxCgWERqjAljGdvgcGJXIUiJm7ZBVlp\nGM1JFo8LeGYI2wtZxQfW4lrfC5J0r7MquDVfatYmb1vb3rdx0iD6MeQrF46Hroip\n4qv5uGBq3fjMoEYi5XJvb2A=\n-----END PRIVATE KEY-----\n',
        FIREBASE_CLIENT_EMAIL: 'firebase-adminsdk-sh2v3@project-infinity-98561.iam.gserviceaccount.com',
        FIREBASE_CLIENT_ID: '108291925916331686796',
        FIREBASE_AUTH_URI: 'https://accounts.google.com/o/oauth2/auth',
        FIREBASE_TOKEN_URI: 'https://oauth2.googleapis.com/token',
        FIREBASE_AUTH_PROVIDER_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
        FIREBASE_CLIENT_CERT_URL:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sh2v3%40project-infinity-98561.iam.gserviceaccount.com',
        GCP_STORAGE_BUCKET: 'project-infinity-98561.appspot.com',
      },
    },
  ],
};

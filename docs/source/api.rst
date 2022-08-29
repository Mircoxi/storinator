***
API
***

.. _options:

OptionsType
-------

The OptionsType is used to pass in optional flags to storage objects.

:code:`expireIn` - A numeric value specifying the number of seconds from "now" (where now means the time of setting)
that the object should be considered to be "expired". Attempting to access the item after this time will remove it
from the user's system.

:code:`protect` - A boolean value specifying whether the object is "read only". It cannot be altered or deleted
without explicitly setting the force parameter on the delete function.

.. _localstorageobject:

LocalStorage Object
-------------------

The LocalStorage object has four properties that can be
accessed.

:code:`name` - This is simply the key of the object, as
stored on the system.

:code:`value` - This is the value of the object, and is
what you'll usually be wanting to access.

:code:`expires` - A unix timestamp, this is the expiry time
of the object. This is optional, and may not be included
in the object.

:code:`protect` - A boolean value denoting whether
the object is protected.
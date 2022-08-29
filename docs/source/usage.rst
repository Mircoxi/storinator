*****
Usage
*****

Using :code:`storinator` is relatively simple.

.. _localStorage:
Local Storage
=============

At the moment, :code:`storinator` is built exclusively for expanding local storage capabilities. This will change
in future versions.

Setting
-------

The basic operation you'll want to do is setting.

.. code-block:: javascript

    Storinator.setLocal('name', 'value');

Optionally, :ref:`options` can be passed in to extend the functionality. For example:

.. code-block:: javascript

    Storinator.setLocal('some important data', 'some important value', {expireIn: 2592000, protect: true});

This would set a storage object that expires in 30 days, and cannot be overwritten.

If you attempt to overwrite a protected stored object, an :code:`Error` is thrown. As such, it's recommended to use
try-catch blocks if you're using any of the advanced functionality.

Getting
-------

To use your newly-stored object, you need to retrieve it first.

.. code-block:: javascript

    var storedObject = Storinator.getLocal('name')

By default, :code:`getLocal` will return a :ref:`localstorageobject` which contains data about the stored object.
You can get the value by simply accessing the value property:

.. code-block:: javascript

    console.log(storedObject.value)
    // 'some value here'

In cases where there's no stored object by the key specified, or it has expired, :code:`null` is returned. If an object is present, but
wasn't created by :code:`storinator`, an :code:`Error` is thrown.

Deleting
--------

To delete an object, simply call the following:

.. code-block:: javascript

    Storinator.deleteLocal('name')

If an object is protected, it'll throw an error. If you really, `really` want to delete a protected object,
the :code:`force` parameter will override this.

.. code-block:: javascript

    Storinator.deleteLocal('some protected data', true)

If you want to overwrite protected data, you have to explicitly delete it first as a precautionary step.